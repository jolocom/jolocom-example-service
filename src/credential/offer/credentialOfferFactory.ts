import { injectable } from 'inversify'
import { CredentialOffer } from '@jolocom/protocol-ts'
import { CredentialOfferRequest } from './credentialOfferRequest'

@injectable()
export class CredentialOfferFactory {
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
