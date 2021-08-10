import { inject, injectable } from 'inversify'
import { ClaimsMetadata } from './claimsMetadata'
import { TYPES } from '../types'
import { BaseMetadata } from 'cred-types-jolocom-core/types'

/**
 * This implementation is providing service of {@link ClaimsMetadata} concrete implementations.
 */
@injectable()
export class ClaimsMetadataProvider {
  constructor(@inject(TYPES.ClaimsMetadata) private claimsMetadata: ClaimsMetadata) {}

  /**
   * Provides claims metadata representation based on provided type.
   *
   * @param {string} type The type of claims metadata concrete implementation.
   * @return {BaseMetadata} The {@link BaseMetadata} concrete implementation instance.
   */
  public getByType(type: string): BaseMetadata {
    this.assertExists(type)

    return this.claimsMetadata[type]
  }

  private assertExists(type: string) {
    if (!(type in this.claimsMetadata)) {
      throw new Error(`Claims metadata with type '${type}' not found.`)
    }
  }
}
