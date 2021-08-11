import { AssertionError } from 'assert'
import { InvalidArgumentException } from '../exception/invalidArgumentException'

/**
 * This implementation defines application common asserts.
 */
export class Assert {
  /**
   * Asserts that provided value is defined and throws {@link AssertionError} if not.
   *
   * @param {any} value The value to be tested if defined.
   * @param {string} propertyName The property path to the value.
   * @throws {@link AssertionError}
   */
  public static isDefined<T>(value: T, propertyName?: string): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
      throw new AssertionError({
        message: propertyName
          ? `Expected 'value' of property '${propertyName}' to be defined, but received '${value}'`
          : `Expected 'value' to be defined, but received '${value}'`
      })
    }
  }

  /**
   * Asserts that provided value is type of {@link true} and throws {@link InvalidArgumentException} if not.
   *
   * @param {any} value The value to be tested if defined.
   * @param {string} message The message to throw if assertion failed (optional).
   * @throws {@link InvalidArgumentException}
   */
  public static true(value: any, message: string | null = null) {
    if (value !== true) {
      throw new InvalidArgumentException(message || `Expected a value to be true. Got: ${value}`)
    }
  }
}
