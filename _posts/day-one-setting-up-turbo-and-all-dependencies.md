---
updatedAt: "2024-06-17T14:00:00.000Z"
title: "Day One: Setting up Turbo and All Dependencies"
project: "Utter Todo"
excerpt: "Let's install Turbo, t3-app, Nest, ESLint, Prettier, TypeScript, and ensure everything is running smoothly and orchestrated by Turbo."
tags: ["Turborepo", "Nest", "Next", "TypeScript", "React"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
prev: "utter-todo-from-nothing-to-an-automated-cicd-deploying-on-aws"
next: "day-two-the-business-rules"
---

In this post, we will set up a Turborepo for the "Utter Todo" project. We'll install `t3-app`, `Nest`, `ESLint`, `Prettier`, and `TypeScript`, ensuring everything runs smoothly and is orchestrated by Turbo.

## Initial Setup

First, let's create our project directory and initialize a Turbo repo:

```bash
mkdir utter-todo
cd utter-todo
pnpm dlx create-turbo@latest ./
```

Choose `pnpm workspaces` as your package manager.

Next, let's clean up the initial Turbo installation by removing unnecessary packages. We'll start from scratch.

## Configuring `pnpm-workspace.yaml`

Update `pnpm-workspace.yaml` as follows:

```yaml
# ./pnpm-workspace.yaml

packages:
  - "apps/*"
  - "packages/*"
  - "config/*"
```

## Updating the Root `package.json`

Modify the root `package.json`:

```json
// ./package.json

{
  "name": "utter-todo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "devDependencies": {
    "prettier": "^3.2.5",
    "turbo": "^2.0.4",
    "typescript": "^5.4.5"
  },
  "packageManager": "pnpm@9.1.1",
  "engines": {
    "node": ">=18"
  },
  "workspaces": [
    "config/*",
    "packages/*",
    "apps/*"
  ]
}
```

## Setting Up Configuration Packages

Let's set up the configuration packages for TypeScript, ESLint, and Prettier.

### TypeScript Configuration

Create the TypeScript config package:

```bash
mkdir -p config/typescript-config
cd config/typescript-config
pnpm init
```

Add the following `package.json`:

```json
// ./config/typescript-config/package.json

{
  "name": "@utter-todo/typescript-config",
  "version": "0.0.1",
  "private": true,
  "license": "MIT",
  "files": ["next.json", "node.json", "nest.json"]
}
```

Refer to the rules for each environment here:
- [next.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/typescript-config/next.json)
- [node.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/typescript-config/node.json)
- [nest.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/typescript-config/nest.json)

### Prettier Configuration

Set up the Prettier config:

```bash
cd ../..
mkdir -p config/prettier
cd config/prettier
pnpm init
pnpm add -D prettier prettier-plugin-tailwindcss
touch index.mjs
```

Add the Prettier config:

```javascript
// ./config/prettier/index.mjs

/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  bracketSameLine: false,
}

export default config
```

Update the `package.json`:

```json
// ./config/prettier/package.json

{
  "name": "@utter-todo/prettier",
  "version": "0.0.1",
  "main": "index.mjs",
  "private": true,
  "license": "MIT",
  "devDependencies": {
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.6.4"
  }
}
```

### ESLint Configuration

Set up the ESLint config:

```bash
cd ../..
mkdir -p config/eslint-config
cd config/eslint-config
pnpm init
pnpm add -D @rocketseat/eslint-config eslint-plugin-simple-import-sort
```

Update the `package.json`:

```json
// ./config/eslint-config/package.json

{
  "name": "@utter-todo/eslint-config",
  "version": "0.0.1",
  "private": true,
  "files": [
    "react.js",
    "next.js",
    "node.js"
  ],
  "devDependencies": {
    "@utter-todo/prettier": "workspace:*",
    "@rocketseat/eslint-config": "^2.2.2",
    "eslint-plugin-simple-import-sort": "^12.1.0"
  },
  "eslintConfig": {
    "extends": ["./react.js"]
  }
}
```

Refer to the rules for each environment here:
- [react.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/eslint-config/react.js)
- [node.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/eslint-config/node.js)
- [next.json](https://github.com/rcmonteiro/utter-todo/blob/main/config/eslint-config/next.js)

### Checking Initial Setup

Back in the root directory, install dependencies and check if everything is running:

```bash
cd ../..
pnpm i
pnpm run dev
```

Since we don't have any dev scripts in our packages yet, nothing will run, but there should be no errors.

### Creating the Domain Package

Create the domain package for business logic:

```bash
mkdir -p packages/domain
cd packages/domain
pnpm init
pnpm add -D typescript @types/node vite-tsconfig-paths vitest
```

Update the `package.json`:

```json
// ./packages/domain/package.json

{
  "name": "@utter-todo/domain",
  "version": "0.0.1",
  "main": "src/index.ts",
  "scripts": {
    "test": "vitest run --dir src/use-cases",
    "test:watch": "vitest --dir src/use-cases"
  },
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^20.14.2",
    "@utter-todo/eslint-config": "workspace:*",
    "@utter-todo/prettier": "workspace:*",
    "@utter-todo/typescript-config": "workspace:*",
    "typescript": "^5.4.5",
    "vite-tsconfig-paths": "^4.3.2",
    "vitest": "^1.6.0"
  },
  "prettier": "@utter-todo/prettier",
  "eslintConfig": {
    "extends": [
      "@utter-todo/eslint-config/node"
    ]
  }
}
```

Make some changes in the tsconfig.json:

```json
// ./packages/domain/tsconfig.json  

{
  "extends": "@utter-todo/typescript-config/node.json",
  "include": [
    "src/**/*",
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "types": [
      "vitest/globals"
    ],
    "allowJs": true,
    "incremental": true,
    "esModuleInterop": true,
  },
  "exclude": [
    "node_modules"
  ]
}
```

Install local dependencies:

```bash
pnpm i
```

Create a draft for the Task entity to test if everything works:

```bash
mkdir -p src/entities
cd src/entities
touch task.ts
```

```typescript
// ./packages/domain/entities/task.ts

export class Task {
  private id: string;
  private title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
```

Check if VS Code shows any errors or auto-fixes on save.

### Setting Up the Web Package

Install the Web package:

```bash
cd ../..
mkdir -p apps/web
cd apps/web
pnpm create t3-app@latest ./
```

Follow the prompts:

- *Yes* for TypeScript
- *Yes* for Tailwind CSS
- *No* for tRPC
- *None* for authentication
- *None* for ORM
- *Yes* for Next.js App Router
- *PostgreSQL* for database provider
- *No* for initializing a Git repository
- *Yes* for running `pnpm install`
- *@/* for import alias

Update `package.json`:

```json
// ./apps/web/package.json

{
  "name": "@utter-todo/web",
  ...
  "devDependencies": {
    "@utter-todo/eslint-config": "workspace:*",
    "@utter-todo/prettier": "workspace:*",
    "@utter-todo/typescript-config": "workspace:*",
    "@types/node": "^20.11.20",
    "@types/react": "^18.2.57",
    "@types/react-dom": "^18.2.19",
    "postcss": "^8.4.34",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.2"
  },
  ...
  "

prettier": "@utter-todo/prettier",
  "eslintConfig": {
    "extends": [
      "@utter-todo/eslint-config/next"
    ]
  }
}
```

Check if everything is running:

```bash
cd ../..
pnpm i
pnpm run dev
```

Install `shadcn-ui` and `vitest`:

```bash
pnpm add -D vitest vite-tsconfig-paths
pnpm dlx shadcn-ui@latest init
```

Follow the prompts:

- *Default* style
- *Slate* base color
- *Yes* for CSS variables

Update `tsconfig.json`:

```json
// ./apps/web/tsconfig.json

{
  "extends": "@utter-todo/typescript-config/next.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

### Setting Up the API Package

Install Nest.js for the API:

```bash
cd apps
nest new api
pnpm add -D vitest
```

Update `package.json`:

```json
// ./apps/api/package.json

{
  "name": "@utter-todo/api",
  "version": "0.0.1",
  "private": true,
  "license": "MIT",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "devDependencies": {
    "@utter-todo/eslint-config": "workspace:*",
    "@utter-todo/prettier": "workspace:*",
    "@utter-todo/typescript-config": "workspace:*",
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.3.1",
    "@types/supertest": "^6.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "prettier": "@utter-todo/prettier",
  "eslintConfig": {
    "extends": [
      "@utter-todo/eslint-config/node"
    ]
  }
}
```

Update `tsconfig.json`:

```json
// ./apps/api/tsconfig.json

{
  "extends": "@utter-todo/typescript-config/nest.json",
  "include": ["src/**/*", "@types/**/*"],
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },
    "types": ["vitest/globals"]
  }
}
```

Change the Nest app port to avoid conflicts:

```typescript
// ./apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
```

Check if everything is running:

```bash
cd ..
pnpm i
pnpm run dev
```

![alt text](/posts/utter-dependencies.png)

### Conclusion

We've successfully set up Turbo, configured our monorepo, and installed the main dependencies for our project. Next, we'll build the domain package with TDD!



