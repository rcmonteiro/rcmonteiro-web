---
updatedAt: "2024-05-28T15:28:10.000Z"
title: "Structuring Your Code with Clean Architecture: A 5-Layer Approach"
project: "Do Bairro"
excerpt: "In this post, we explore implementing Clean Architecture in a monorepo using Next.js, Fastify, Postgres, and Prisma. By structuring our code into five layers—Domain, Application, Controller, Infrastructure, and User Interface"
tags: ["Turborepo", "Clean Architecture", "Typescript"]
repoUrl: "https://github.com/rcmonteiro/dobairro"
prev: "exploring-microservices-a-first-step"
---
When building a complex application, organizing your codebase effectively is crucial. This is where Clean Architecture shines. In this post, we'll explore how to structure your code using five layers in a turborepo project that leverages Next.js for the web, Fastify for the API, and Postgres with Prisma. We'll break down each layer and illustrate how they interact, ensuring your application is scalable, maintainable, and testable.

## The 5 Layers of Clean Architecture

Clean Architecture is all about separation of concerns and dependency inversion. Let's dive into each layer:

- **Domain Layer**
- **Application Layer**
- **Controller Layer**
- **Infrastructure Layer**
- **User Interface Layer**

![CA](/posts/ca-5-layers.png)

### 1. Domain Layer

The Domain Layer is the core of your application. It contains the business logic and rules, represented by entities, value objects, and aggregates.

- **Entities**: Core objects with a distinct identity (e.g., User, Order).
- **Value Objects**: Immutable objects representing a concept (e.g., Email, Address, Url).
- **Aggregates**: Groups of related entities and value objects

```typescript
// ./domain/entities/organization.ts
import { Entity } from '@/shared/types/entity'
import type { Id } from '@/shared/types/id'
import { Slug } from '@/shared/value-objects/slug'

export interface IOrganization {
  ownerId: Id
  name: string
  slug?: Slug
  createdAt?: Date
  updatedAt?: Date
}

export class Organization extends Entity<IOrganization> {
  private constructor(state: IOrganization, id?: Id) {
    super(state, id)
  }

  public get slug(): Slug | undefined {
    return this.state.slug
  }

  public static create(state: IOrganization, id?: Id): Organization {
    state.createdAt = state.createdAt ?? new Date()
    state.slug = state.slug ?? Slug.create(state.name)
    return new Organization(state, id)
  }
}

```

### 2. Application Layer

The Application Layer contains use cases, which encapsulate the business logic that is specific to the application. It also defines repository interfaces to abstract data access.

- **Use Cases**: Coordinate interactions between the domain and other layers.
- **Repository Interfaces**: Define contracts for data access methods (e.g., `IUserRepository`).

```typescript
// application/use-cases/create-organization.ts
import { Organization } from '@/domain/entities/organization'
import type { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { type Either, right } from '../either'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { SlugAlreadyExistsError } from './_errors/slug-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  ownerId: Id
  name: string
}

type CreateOrganizationUseCaseResponse = Either<
  SlugAlreadyExistsError,
  {
    org: Organization
  }
>

export class CreateOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(
    dto: CreateOrganizationUseCaseRequest,
  ): Promise<CreateOrganizationUseCaseResponse> {
    const slug = Slug.createFromText(dto.name)._value
    const orgExists = await this.organizationRepo.findBySlug(slug)

    if (orgExists) {
      throw new SlugAlreadyExistsError()
    }

    const org = await this.organizationRepo.create(Organization.create(dto))
    return right({ org })
  }
}

// application/repositories/organization-repo.ts
import type { Organization } from '@/domain/entities/organization'

export interface OrganizationRepo {
  create(data: Organization): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
}
```

### 3. Controller Layer

The Controller Layer handles user interface requests and orchestrates the interactions between the user interface and the application layer.

- **Controllers**: Translate HTTP requests into use case invocations.

```typescript
// controllers/create-organization.ts
import { Organization } from '@/domain/entities/organization'
import type { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { type Either, right } from '../either'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { SlugAlreadyExistsError } from './_errors/slug-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  ownerId: Id
  name: string
}

type CreateOrganizationUseCaseResponse = Either<
  SlugAlreadyExistsError,
  {
    org: Organization
  }
>

export class CreateOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(
    dto: CreateOrganizationUseCaseRequest,
  ): Promise<CreateOrganizationUseCaseResponse> {
    const slug = Slug.createFromText(dto.name)
    const orgWithSameSlug = await this.organizationRepo.findBySlug(slug._value)

    if (orgWithSameSlug) {
      throw new SlugAlreadyExistsError()
    }

    const org = await this.organizationRepo.create(
      Organization.create({ ...dto, slug }),
    )

    return right({ org })
  }
}
```

### 4. Infrastructure Layer

The Infrastructure Layer contains the concrete implementations of the repository interfaces. It integrates with frameworks and external services like Prisma and Postgres.

- **Repository Implementations**: Actual implementations of repository interfaces using Prisma and Postgres.
- **Framework Integrations**: Fastify for API, Prisma for ORM, Postgres for the database.

```typescript
// api/src/repositories/prisma-organization-repo.ts
import type { Organization, OrganizationRepo } from '@dobairro/core'

import { db } from '@/lib/prisma'
import { PrismaOrganizationMapper } from '@/mappers/prisma-organization-mapper'

export class PrismaOrganizationRepo implements OrganizationRepo {
  public async create(organization: Organization): Promise<Organization> {
    const data = PrismaOrganizationMapper.toPrisma(organization)
    const dbOrganization = await db.organization.create({
      data,
    })
    return PrismaOrganizationMapper.toDomain(dbOrganization)
  }

  public async findBySlug(slug: string): Promise<Organization | null> {
    const organization = await db.organization.findUnique({
      where: {
        slug,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }
}
```

### 5. User Interface Layer

The User Interface Layer presents data to the user and handles user interactions. In our case, it's built with Next.js. The front-end organizes all the UI elements into pages and components, consuming external services like our API to populate the interface with data. While some redundancy validations can be performed here, the front-end remains free of business logic, ensuring a clear separation of concerns.


### Mappers and Presenters

In a Clean Architecture, mappers and presenters play crucial roles in transforming data between layers.

- **Mappers**: Convert data between different representations (e.g., domain models to Persistence and vice versa).
- **Presenters**: Format data for the UI.

**Example Mapper in the Infra Layer:**

```typescript
// api/src/mappers/prisma-organization-mapper.ts
import { Id, Organization, Slug } from '@dobairro/core'
import type { Organization as PrismaOrganization, Prisma } from '@prisma/client'

export class PrismaOrganizationMapper {
  static toPrisma(
    organization: Organization,
  ): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: organization.id.toString(),
      ownerId: organization.ownerId.toString(),
      name: organization.name,
      slug: organization.slug._value,
      avatarUrl: organization.avatarUrl,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    }
  }

  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create({
      ownerId: new Id(raw.ownerId),
      name: raw.name,
      avatarUrl: raw.avatarUrl ?? '',
      slug: Slug.create(raw.slug),
    })
  }
}
```

**Example Presenter for the User Interface Layer:**

```typescript
// api/src/presenters/organization-presenter.ts
import type { Organization } from '@dobairro/core'

export class OrganizationPresenter {
  static toHTTP(organization: Organization) {
    return {
      id: organization.id.toString(),
      name: organization.name,
      slug: organization.slug,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    }
  }
}

```

### Dependency Injection and Composition Root

To tie everything together, we use DIP (Dependency Inversion Principle). Example for a factory for the Create Organization Use Case:

```typescript
// api/factories/make-create-organization.ts
import { CreateOrganizationUseCase } from '@dobairro/core'

import { PrismaOrganizationRepo } from '@/repositories/prisma-organization-repo'

export const makeCreateOrganization = () => {
  const organizationRepo = new PrismaOrganizationRepo()
  const authenticateUserUseCase = new CreateOrganizationUseCase(
    organizationRepo,
  )

  return authenticateUserUseCase
}

```

### Conclusion

By organizing your code into these five layers, you create a clear separation of concerns, making your application more modular, testable, and maintainable. Each layer has a distinct responsibility, and the use of interfaces ensures that higher-level modules are not tightly coupled to lower-level implementations. This approach is highly beneficial in complex projects, enabling easier changes and improvements over time.

---

This structured approach to code organization with Clean Architecture helps maintain clarity and separation of concerns, making it easier to manage and scale your application as it grows.