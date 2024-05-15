export class Post {
  private _id: string
  private _title: string
  private _body: string
  private _excerpt: string
  private _date: Date
  private _project: string
  private _tags: string[]

  constructor(
    slug: string,
    title: string,
    body: string,
    excerpt: string,
    date: string,
    project: string,
    tags: string[],
  ) {
    this._id = slug
    this._title = title
    this._body = body
    this._excerpt = excerpt
    this._date = new Date(date)
    this._project = project
    this._tags = tags
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

  get excerpt(): string {
    return this._excerpt
  }

  get date(): Date {
    return this._date
  }

  get project(): string {
    return this._project
  }

  get tags(): string[] {
    return this._tags
  }
}
