import { ValueObject } from './types/value-object'
import { Url } from './value-objects/url'

interface IProject {
  title: string
  repoUrl: string
}

export class Project extends ValueObject<IProject> {
  private _title: string
  private _repoUrl: Url

  constructor(props: IProject) {
    super(props)
    this._title = props.title
    this._repoUrl = new Url(props.repoUrl)
  }

  public get title(): string {
    return this._title
  }

  public get repoUrl(): Url {
    return this._repoUrl
  }
}
