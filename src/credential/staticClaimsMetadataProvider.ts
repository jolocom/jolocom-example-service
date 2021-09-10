import { inject, injectable } from 'inversify'
import { ClaimsMetadataMap } from './claimsMetadataMap'
import { TYPES } from '../types'
import { BaseMetadata } from 'cred-types-jolocom-core/types'
import { InvalidArgumentException } from '../exception/invalidArgumentException'

/**
 * This implementation is providing service of {@link BaseMetadata}.
 */
@injectable()
export class StaticClaimsMetadataProvider {
  constructor(@inject(TYPES.StaticClaimsMetadataMap) private claimsMetadataMap: ClaimsMetadataMap) {}

  /**
   * Provides predefined (static) claims metadata representation based on provided type.
   *
   * @param {string} type The type of claims metadata concrete implementation.
   * @return {BaseMetadata} The {@link BaseMetadata} concrete implementation instance.
   */
  public getByType(type: string): BaseMetadata {
    this.assertExists(type)

    return this.claimsMetadataMap[type]
  }

  private assertExists(type: string) {
    if (!(type in this.claimsMetadataMap)) {
      throw new InvalidArgumentException(`Claims metadata with type '${type}' not found.`)
    }
  }
}
