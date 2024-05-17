import type { ParsedMarkdown } from '@/infra/providers/markdown-parser'

export class Post {
  private _id: string
  private _title: string
  private _body: string
  private _repoUrl: string
  private _excerpt: string
  private _updatedAt: Date
  private _project: string
  private _next?: string
  private _prev?: string
  private _tags: string[]

  constructor(slug: string, data: Partial<ParsedMarkdown>) {
    this._id = slug
    this._title = data.title ?? ''
    this._body = data.content ?? ''
    this._excerpt = data.excerpt ?? ''
    this._updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date()
    this._project = data.project ?? ''
    this._tags = data.tags ?? []
    this._repoUrl = data.repoUrl ?? ''
    this._next = data.next ?? ''
    this._prev = data.prev ?? ''
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get body(): string {
    return this._body
  }

  get repoUrl(): string {
    return this._repoUrl
  }

  get excerpt(): string {
    return this._excerpt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  get project(): string {
    return this._project
  }

  get tags(): string[] {
    return this._tags
  }

  get next(): string | undefined {
    return this._next
  }

  get prev(): string | undefined {
    return this._prev
  }
}
