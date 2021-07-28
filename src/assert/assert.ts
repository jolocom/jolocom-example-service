import { AssertionError } from 'assert'
import { InvalidArgumentException } from '../exception/invalidArgumentException'

export class Assert {
  public static isDefined<T>(value: T, propertyName?: string): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
      throw new AssertionError({
        message: propertyName
          ? `Expected 'value' of property '${propertyName}' to be defined, but received '${value}'`
          : `Expected 'value' to be defined, but received '${value}'`
      })
    }
  }

  public static true(value: any, message: string | null = null) {
    if (value !== true) {
      throw new InvalidArgumentException(message || `Expected a value to be true. Got: ${value}`)
    }
  }
}
