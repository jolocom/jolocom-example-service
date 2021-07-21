import { inject, injectable } from 'inversify'
import { ClaimsMetadata } from './claimsMetadata'
import { TYPES } from '../types'
import { BaseMetadata } from 'cred-types-jolocom-core/types'

@injectable()
export class ClaimsMetadataProvider {
  constructor(@inject(TYPES.ClaimsMetadata) private claimsMetadata: ClaimsMetadata) {}

  public getByType(type: string): BaseMetadata {
    this.assertExists(type)

    return this.claimsMetadata[type]
  }

  private assertExists(type: string) {
    if (!(type in this.claimsMetadata)) {
      throw new Error(`Claims meta data with type '${type}' not found.`)
    }
  }
}
