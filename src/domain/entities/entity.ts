import { Id } from './types/id'

export abstract class Entity<T> {
  private readonly _id: Id
  protected state: T

  get id() {
    return this._id
  }

  protected constructor(state: T, id?: Id) {
    this._id = id ?? new Id()
    this.state = state
  }

  protected isEntity(object: unknown): boolean {
    return object instanceof Entity
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false
    }

    if (object === this) {
      return true
    }

    if (!this.isEntity(object)) {
      return false
    }

    if (this._id.equals(object._id)) {
      return true
    }

    return false
  }
}
