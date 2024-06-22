---
updatedAt: "2024-06-18T14:00:00.000Z"
title: "Day two - The Business Rules"
project: "Utter Todo"
excerpt: "Here we will create the business rules for our Todo App, they will be the foundation of our application."
tags: ["Clean Architecture", "Domain Driven Design", "Business Rules"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
prev: "day-one-setting-up-turbo-and-all-dependencies"
next: "day-three-the-front-end"
---

Let's start by setting up the domain package for business logic.

First we need to create a new task on `turbo.json`, adding `"test"`, with that we can run the tests for all the packages in the monorepo.

```json
// ./turbo.json

{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env", ".env.*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {}
  }
}
```

We also need to update the root `package.json` to include the `test` script:

```json
// ./package.json

{
  "name": "utter-todo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "test": "turbo run test",
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

For this Todo App, we'll keep the things simple, as we want to focus on a complete automation of the CI/CD pipeline.

The domain will have this project structure:

```
├── domain
│    ├── ___tests___
│    │   ├── repositories
│    │   │   └── fake-task-repository.ts
│    ├── entities
│    │   └── value-objects
│    │   │  └── id.ts
│    │   └── task.ts
│    ├── repositories
│    │   └── task-repository.ts
│    ├── use-cases
│    │   └── _errors
│    │   │   └── invalid-title-error.ts
│    │   │   └── resource-not-found-error.ts
│    │   └── create-task.ts
│    │   └── create-task.test.ts
│    │   └── delete-task.ts
│    │   └── delete-task.test.ts
│    │   └── fetch-tasks.ts
│    │   └── fetch-tasks.test.ts
│    │   └── toggle-task-completed.ts
│    │   └── toggle-task-completed.test.ts
```

We can make our *Task Entity* a little better:

```typescript
// ./packages/domain/src/entities/task.ts

import { Id } from './value-objects/id'

export type TTask = {
  title: string
  id?: string
  createdAt?: string
}

export class Task {
  readonly #id: Id
  readonly #createdAt: Date
  #title: string
  #completedAt?: Date

  constructor({ title, id, createdAt }: TTask) {
    this.#id = id ? new Id(id) : new Id()
    this.#title = title
    this.#createdAt = createdAt ? new Date(createdAt) : new Date()
  }

  get id(): Id {
    return this.#id
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  get title(): string {
    return this.#title
  }

  set title(newTitle: string) {
    this.#title = newTitle
  }

  toggleCompleted(): void {
    if (this.isCompleted()) {
      this.#completedAt = undefined
    } else {
      this.#completedAt = new Date()
    }
  }

  isCompleted(): boolean {
    return !!this.#completedAt
  }

  static isValidTitle(title: string): boolean {
    return !!title && title.length >= 3
  }
}

```

We will use a PostgreSQL database to store our tasks, but our domain will be agnostic to the database, so we can easily switch to another one in the future, and for that we need to create a repository for our Todo Entity:

```typescript 
// ./packages/domain/src/repositories/task-repo.ts

import type { Task } from '@/entities/task'

export type TStatus = 'ALL' | 'COMPLETED' | 'PENDING'

export interface TaskRepository {
  create(data: Task): Promise<Task>
  save(data: Task): Promise<Task>
  delete(data: Task): Promise<void>
  findManyByStatus(status: TStatus): Promise<Task[]>
  findById(taskId: string): Promise<Task | null>
}
```

Why we are using an Interface instead of a class? Because we want to implement whatever the database we want to use, for example, to run the unit tests we can use a fake repository, like this:

```typescript
// ./packages/domain/src/_tests/repositories/fake-task-repository.ts

import { Task } from '@/entities/task'
import { Id } from '@/entities/value-objects/id'
import type { TaskRepository, TStatus } from '@/repositories/task-repo'

export class FakeTaskRepository implements TaskRepository {
  items: Task[] = []

  async create(data: Task): Promise<Task> {
    this.items.push(data)
    return data
  }

  async save(data: Task): Promise<Task> {
    const index = this.items.findIndex((task) => task.id.equals(data.id))
    this.items[index] = data
    return data
  }

  async delete(data: Task): Promise<void> {
    const index = this.items.findIndex((task) => task.id.equals(data.id))
    this.items.splice(index, 1)
  }

  async findManyByStatus(status: TStatus): Promise<Task[]> {
    return this.items.filter((task) => {
      if (status === 'COMPLETED') {
        return task.isCompleted()
      }
      if (status === 'PENDING') {
        return !task.isCompleted()
      }
      return true
    })
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((task) => task.id.equals(new Id(taskId)))
    if (!task) {
      return null
    }
    return task
  }
}
```

Now that we have an entity and a repository, we can create our uses cases with unit tests:

```typescript
// ./packages/domain/src/use-cases/create-task.ts

import { type Either, left, right } from '@/common/either'
import { Task } from '@/entities/task'
import type { TaskRepository } from '@/repositories/task-repo'

import { InvalidTitleError } from './_errors/invalid-title-error'

type CreateTaskRequest = { title: string }

type CreateTaskResponse = Either<
  InvalidTitleError,
  {
    task: Task
  }
>

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ title }: CreateTaskRequest): Promise<CreateTaskResponse> {
    if (!Task.isValidTitle(title)) {
      return left(new InvalidTitleError())
    }

    const task = await this.taskRepository.create(new Task({ title }))
    return right({ task })
  }
}
```

And the unit test:

```typescript
// ./packages/domain/src/_tests/use-cases/create-task.test.ts

import { FakeTaskRepository } from '@/_tests/repositories/fake-task-repo'
import { Id } from '@/entities/value-objects/id'

import { InvalidTitleError } from './_errors/invalid-title-error'
import { CreateTaskUseCase } from './create-task'

let sut: CreateTaskUseCase
let taskRepo: FakeTaskRepository

describe('Create Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new CreateTaskUseCase(taskRepo)
  })

  it('should be able to create a task', async () => {
    const result = await sut.execute({ title: 'Test task' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.task.title).toBe('Test task')
      expect(result.value.task.createdAt).toBeInstanceOf(Date)
      expect(result.value.task.id).toBeInstanceOf(Id)
    }
  })

  it('should not be able to create a task with a title less than 3 characters', async () => {
    const result = await sut.execute({ title: '' })
    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidTitleError)
    }
  })
})
```

You can check each use case and respective unit test here:

- *./create-task.ts*: [code](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/create-task.ts) | [unit test](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/create-task.test.ts)
- *./delete-task.ts*: [code](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/delete-task.ts) | [unit test](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/delete-task.test.ts)
- *./fetch-tasks.ts*: [code](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/fetch-tasks.ts) | [unit test](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/fetch-tasks.test.ts)
- *./get-task.ts*: [code](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/get-task.ts) | [unit test](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/get-task.test.ts)
- *./toggle-task-completed.ts*: [code](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/toggle-task-completed.ts) | [unit test](https://github.com/rcmonteiro/utter-task/blob/main/packages/domain/src/use-cases/toggle-task-completed.test.ts) - 


We can now run all the tests with turbo:

```bash
pnpm run test
```

![alt text](/posts/turbo-uc-tests.png)

Next step, we will create a simple UI on Next.js using Tailwind CSS and Shadcn/UI components.
And of course, more tests! TDD is the way!

![this is the way](https://media1.tenor.com/m/SVpBVhisHaoAAAAd/the-book-of-boba-fett-din-djarin.gif)
