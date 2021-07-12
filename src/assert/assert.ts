import { AssertionError } from 'assert'

export class Assert {
  public static issDefined<T>(value: T, propertyName?: string): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
      throw new AssertionError({
        message: propertyName
          ? `Expected 'value' of property '${propertyName}' to be defined, but received '${value}'`
          : `Expected 'value' to be defined, but received '${value}'`
      })
    }
  }
}
