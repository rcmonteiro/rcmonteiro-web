import { ValueObject } from '../types/value-object'

interface IPostRelated {
  prev?: string
  next?: string
}

export class PostRelated extends ValueObject<IPostRelated> {
  private _previousPost?: string
  private _nextPost?: string

  constructor(props: IPostRelated) {
    super(props)
    this._previousPost = props.prev
    this._nextPost = props.next
  }

  public get prev(): string | undefined {
    return this._previousPost
  }

  public get next(): string | undefined {
    return this._nextPost
  }
}
