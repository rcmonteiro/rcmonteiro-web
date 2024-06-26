---
updatedAt: "2024-06-23T14:00:00.000Z"
title: "Day five - Deploy to AWS"
project: "Utter Todo"
excerpt: "Understanding a Comprehensive GitHub Actions Workflow for CI/CD"
tags: ["Github Actions", "AWS"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
prev: "day-four-the-backend"
---

## Understanding a Comprehensive GitHub Actions Workflow for CI/CD

GitHub Actions allows you to automate your software workflows directly in your GitHub repository. The YAML configuration described here is a robust Continuous Integration (CI) and Continuous Deployment (CD) workflow. Let’s break down each part of this workflow to understand its functionality and purpose.

### Workflow Configuration

#### Workflow Name and Triggers

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]
```

The workflow is named "CI" and is triggered on two events:
- **Push**: When code is pushed to the `main` branch.
- **Pull Request**: When a pull request is opened or synchronized.

#### Permissions

```yaml
permissions:
  id-token: write
  contents: write
  issues: write
  pull-requests: write
```

Permissions are granted for various actions such as writing to contents, issues, and pull requests, ensuring the workflow can interact with the repository and GitHub services effectively.

### Jobs Configuration

The workflow consists of a single job named `build`, which is designed to build, test, and deploy the application.

#### Job Configuration

```yaml
jobs:
  build:
    name: Build, Test and Deploy
    timeout-minutes: 15
    runs-on: ubuntu-latest
```

- **Name**: "Build, Test and Deploy"
- **Timeout**: 15 minutes
- **Runner**: Uses the latest Ubuntu runner

#### Services

```yaml
services:
  postgres:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    env:
      POSTGRESQL_USERNAME: docker
      POSTGRESQL_PASSWORD: docker
      POSTGRESQL_DATABASE: utter-todo
```

Two services are defined:
- **Postgres**: A PostgreSQL database.

### Steps

#### Checkout Code

```yaml
- name: Checkout
  uses: actions/checkout@v4
```

Checks out the repository code.

#### Setup Node.js and pnpm

```yaml
- name: Install Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20

- uses: pnpm/action-setup@v4
  name: Install pnpm
  with:
    version: 9.1.1
    run_install: false
```

Installs Node.js and `pnpm`, a fast package manager.

#### Setup Cache

```yaml
- name: Get pnpm store directory
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

- uses: actions/cache@v4
  name: Setup pnpm cache
  with:
    path: ${{ env.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-
```

Configures caching for `pnpm` dependencies to speed up subsequent runs.

#### Install Dependencies

```yaml
- name: Install dependencies
  run: pnpm install
```

Installs the project dependencies using `pnpm`.

#### Build and Test

```yaml
- name: Turbo Repo Build
  run: pnpm build

- name: Run Domain Unit Tests (Vitest)
  run: | 
    cd apps/api
    pnpm run test
  env:
    JWT_SECRET: secret
    API_PORT: 4000
    DB_URL: postgresql://docker:docker@localhost:5432/utter-todo?schema=public
    DB_TEST_URL: postgresql://docker:docker@localhost:5432/utter-todo?schema=public

- name: Run API e2e tests (Vitest)
  run: |
    cd apps/api
    pnpm drizzle-kit push
    pnpm run test:e2e
  env:          
    JWT_SECRET: secret
    API_PORT: 4000
    DB_URL: postgresql://docker:docker@localhost:5432/utter-todo?schema=public
    DB_TEST_URL: postgresql://docker:docker@localhost:5432/utter-todo?schema=public

- name: Run WEB Unit Tests (Vitest)
  run: |
    cd apps/web
    pnpm run test
  env:
    NODE_ENV: test
    API_URL: http://localhost:4000
    NEXT_PUBLIC_APP_URL: http://localhost:50789
```

- **Build**: Builds the project.
- **Unit Tests**: Runs unit tests for the API and web applications using `Vitest`.
- **End-to-End (e2e) Tests**: Runs e2e tests for the API.

#### Install and Run Playwright for Web Tests

```yaml
- name: Install Playwright Browsers
  run: |
    cd apps/web
    pnpm add -g playwright
    pnpm exec playwright install --with-deps

- name: Run WEB e2e tests (Playwright)
  run: |
    cd apps/web
    npx playwright test
  env:
    NODE_ENV: test
    API_URL: http://localhost:50789/api
    NEXT_PUBLIC_APP_URL: http://localhost:50789
```

Installs and runs `Playwright` for e2e testing of the web application.

#### Semantic Release and Dynamic Tag Creation

```yaml
- name: Semantic Release
  uses: cycjimmy/semantic-release-action@v4
  env:
    GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}

- name: Create tag
  id: create_tag
  run: |
    SHA=$(echo $GITHUB_SHA | head -c7)
    echo "sha=$SHA" >> $GITHUB_OUTPUT
```

- **Semantic Release**: Automates versioning and package publishing.
- **Create tag**: Creates a dynamic tag based on the current commit SHA.

#### AWS Deployment

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.ECR_ROLE }}
    aws-region: us-east-2

- name: Login to AWS ECR
  id: login-ecr
  uses: aws-actions/amazon-ecr-login@v2

- name: Build and Push Docker API Image
  id: build-docker-api-image
  env: 
    ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
    TAG: ${{ steps.create_tag.outputs.sha }}
  run: | 
    docker build -f Dockerfile.api -t $ECR_REGISTRY/utter_todo_api:$TAG .
    docker tag $ECR_REGISTRY/utter_todo_api:$TAG $ECR_REGISTRY/utter_todo_api:latest
    docker push --all-tags $ECR_REGISTRY/utter_todo_api
    IMAGE=$(echo $ECR_REGISTRY/utter_todo_api:$TAG)
    echo "image=$IMAGE" >> $GITHUB_OUTPUT

- name: Build and Push Docker WEB Image
  id: build-docker-web-image
  env: 
    ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
    TAG: ${{ steps.create_tag.outputs.sha }}
  run: | 
    docker build -f Dockerfile.web -t $ECR_REGISTRY/utter_todo_web:$TAG .
    docker tag $ECR_REGISTRY/utter_todo_web:$TAG $ECR_REGISTRY/utter_todo_web:latest
    docker

 push --all-tags $ECR_REGISTRY/utter_todo_web
    IMAGE=$(echo $ECR_REGISTRY/utter_todo_web:$TAG)
    echo "image=$IMAGE" >> $GITHUB_OUTPUT

- name: Deploy API to AWS App Runner
  id: deploy-api-app-runner
  uses: awslabs/amazon-app-runner-deploy@main
  with: 
    service: utter_todo_api
    image: ${{ steps.build-docker-api-image.outputs.image }}
    access-role-arn: ${{ secrets.APP_RUNNER_ROLE }}
    region: us-east-2
    cpu: 1
    memory: 2
    port: 3000

- name: Deploy WEB to AWS App Runner
  id: deploy-web-app-runner
  uses: awslabs/amazon-app-runner-deploy@main
  with: 
    service: utter_todo_web
    image: ${{ steps.build-docker-web-image.outputs.image }}
    access-role-arn: ${{ secrets.APP_RUNNER_ROLE }}
    region: us-east-2
    cpu: 1
    memory: 2
    port: 3000
```

Deploys the Docker images to AWS App Runner for both the API and web applications.

### Conclusion

This GitHub Actions workflow is a comprehensive CI/CD pipeline that builds, tests, and deploys your application. It handles dependency management, testing, Docker image creation, and deployment to AWS, ensuring that every change is thoroughly tested and seamlessly deployed. By automating these processes, you can maintain high code quality and reduce the manual effort involved in deployment, allowing you to focus more on developing new features and improving your application.