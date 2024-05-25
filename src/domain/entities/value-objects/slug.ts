import { ValueObject } from '../types/value-object'

export class Slug extends ValueObject<string> {
  public _value: string

  private constructor(value: string) {
    super(value)
    this._value = value
  }

  static create(value: string) {
    return new Slug(value)
  }

  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')
    return new Slug(slugText)
  }
}
