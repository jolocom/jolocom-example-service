import { injectable, multiInject } from 'inversify'
import { TYPES } from '../../types'
import { CredentialOffer } from '@jolocom/protocol-ts'

/**
 * This implementation is registry of all predefined (static) {@link CredentialOffer} instances.
 */
@injectable()
export class StaticCredentialOfferProvider {
  constructor(@multiInject(TYPES.CredentialOffer) private credentialOffers: CredentialOffer[]) {}

  /**
   * Provides {@link CredentialOffer} based on provided type.
   *
   * @param {string} type The type of credential offer.
   * @return {CredentialOffer} The instance of predefined {@link CredentialOffer}.
   */
  public getByType(type: string): CredentialOffer {
    this.assertExists(type)

    return this.credentialOffers.find(credentialOffer => credentialOffer.type === type) as CredentialOffer
  }

  private assertExists(type: string) {
    if (!this.credentialOffers.some(credentialOffer => credentialOffer.type === type)) {
      throw new Error(`Credential offer with type '${type}' not found.`)
    }
  }
}
