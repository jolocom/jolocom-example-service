import { injectable } from 'inversify'
import { CredentialOffer } from '@jolocom/protocol-ts'
import { CredentialOfferRequest } from './credentialOfferRequest'

/**
 * This implementation creates representation of initial custom offer request for credential issuance process.
 */
@injectable()
export class CredentialOfferFactory {
  /**
   * Creates representation of initial custom offer request.
   *
   * @param {CredentialOfferRequest} credentialOfferRequest Representation of the user offer request.
   * @return {CredentialOffer} Representation of initial custom offer request ({@link CredentialOffer}).
   */
  public create(credentialOfferRequest: CredentialOfferRequest): CredentialOffer {
    return {
      type: credentialOfferRequest.type,
      renderInfo: {
        renderAs: credentialOfferRequest.renderAs,
      },
      credential: {
        name: credentialOfferRequest.name,
        schema: credentialOfferRequest.schema,
        display: credentialOfferRequest.display,
      },
    }
  }
}
