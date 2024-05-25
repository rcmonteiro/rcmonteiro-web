import { Entity } from './entity'
import { Project } from './project'
import type { Id } from './types/id'
import type { PostRelated } from './value-objects/post-related'
import { Slug } from './value-objects/slug'

interface IPost {
  title: string
  slug: Slug
  body: string
  excerpt: string
  updatedAt: Date
  project: Project
  related: PostRelated
  tags: string[]
}

export class Post extends Entity<IPost> {
  private constructor(state: IPost, id?: Id) {
    super(state, id)
  }

  static create(state: IPost, id?: Id) {
    return new Post(state, id)
  }

  get title(): string {
    return this.state.title
  }

  get slug(): Slug {
    return this.state.slug
  }

  get body(): string {
    return this.state.body
  }

  get excerpt(): string {
    return this.state.excerpt
  }

  get updatedAt(): Date {
    return this.state.updatedAt
  }

  get project(): Project {
    return this.state.project
  }

  get tags(): string[] {
    return this.state.tags
  }

  get related(): PostRelated {
    return this.state.related
  }
}
