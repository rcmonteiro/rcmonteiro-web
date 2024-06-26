---
updatedAt: "2024-06-21T14:00:00.000Z"
title: "Day four - The Back End"
project: "Utter Todo"
excerpt: "The back-end is a Node.js application built with Fastify and Drizzle ORM. It uses a PostgreSQL database to store and retrieve data."
tags: ["Node.js", "Fastify", "Drizzle ORM"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
prev: "day-three-the-front-end"
next: "day-five-deploy-to-aws"
---

## The Back End

The back-end is a Node.js application built with Fastify and Drizzle ORM. It uses a PostgreSQL database to store and retrieve data.

## Controllers using the Domain Layer

The controllers are responsible for handling incoming requests and returning appropriate responses. They interact with the domain layer to perform specific tasks, such as creating, updating, and deleting tasks.

Here we can see the controller for creating a new task, using the `CreateTaskUseCase` from the domain layer, that receives the task repository implementation from the Drizzle ORM.

```typescript
// ./apps/api/src/controllers/create-task.ts

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateTaskUseCase } from 'src/domain/use-cases/create-task'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { Db } from '../database/db'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

export const createTaskController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(auth)
    .post(
      '/tasks',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Create a new Task',
          body: z.object({
            title: z.string().min(3),
          }),
          response: {
            201: z.null(),
            400: z.object({
              message: z.unknown(),
            }),
            401: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { title } = request.body

        const db = await Db.getInstance()
        const taskRepo = new DrizzleTaskRepository(db)
        const createTask = new CreateTaskUseCase(taskRepo)

        const result = await createTask.execute({
          title,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            default:
              throw new BadRequestError(error.message)
          }
        }

        return reply.status(201).send()
      },
    )
}
```


And here is the implementation of the Drizzle ORM repository, it's the only file that have dependencies with the ORM:

```typescript
// ./apps/api/src/database/repositories/drizzle-task-repo.ts

import { eq, isNotNull, isNull } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { Task } from 'src/domain/entities/task'
import type { TaskRepository, TStatus } from 'src/domain/repositories/task-repo'

import { DrizzleTaskMapper } from '../database/mappers/drizzle-task-mapper'
import * as schema from '../database/schema'

export class DrizzleTaskRepository implements TaskRepository {
  public items: Task[] = []

  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async create(data: Task): Promise<Task> {
    await this.db.insert(schema.tasks).values(DrizzleTaskMapper.toDrizzle(data))
    return data
  }

  async save(data: Task): Promise<Task> {
    const toDb = DrizzleTaskMapper.toDrizzle(data)
    await this.db
      .update(schema.tasks)
      .set({
        title: toDb.title,
        completedAt: toDb.completedAt ?? null,
      })
      .where(eq(schema.tasks.id, data.id.toString()))
    return data
  }

  async delete(data: Task): Promise<void> {
    await this.db
      .delete(schema.tasks)
      .where(eq(schema.tasks.id, data.id.toString()))
  }

  async findManyByStatus(status: TStatus): Promise<Task[]> {
    let filter = {}
    if (status === 'COMPLETED') {
      filter = {
        where: isNotNull(schema.tasks.completedAt),
      }
    }
    if (status === 'PENDING') {
      filter = {
        where: isNull(schema.tasks.completedAt),
      }
    }
    const tasks = await this.db.query.tasks.findMany(filter)
    return tasks.map((task) => DrizzleTaskMapper.toDomain(task))
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = await this.db.query.tasks.findFirst({
      where: eq(schema.tasks.id, taskId),
    })
    if (!task) {
      return null
    }
    return DrizzleTaskMapper.toDomain(task)
  }
}
```
