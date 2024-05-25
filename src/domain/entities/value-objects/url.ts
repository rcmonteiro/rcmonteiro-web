import { ValueObject } from '../types/value-object'

export class Url extends ValueObject<string> {
  private _value: string

  constructor(value: string) {
    super(value)
    if (!Url.isValid(value)) {
      throw new Error('Invalid URL')
    }
    this._value = value
  }

  static isValid(url: string): boolean {
    const urlPattern =
      /^(https?:\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{2,5})?(\/[^\s]*)?$/
    return urlPattern.test(url)
  }

  public get value(): string {
    return this._value
  }
}
