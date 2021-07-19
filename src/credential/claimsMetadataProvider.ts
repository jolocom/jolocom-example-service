import { inject, injectable } from 'inversify'
import { ClaimsMetadata } from './claimsMetadata'
import { TYPES } from '../types'

@injectable()
export class ClaimsMetadataProvider {
  constructor(@inject(TYPES.ClaimsMetadata) private claimsMetadata: ClaimsMetadata) {}

  public getByType(type: string) {
    this.assertExists(type)

    return this.claimsMetadata[type]
  }

  private assertExists(type: string) {
    if (!(type in this.claimsMetadata)) {
      throw new Error(`Claims meta data with type '${type}' not found.`)
    }
  }
}
