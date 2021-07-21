import { injectable } from 'inversify'
import { CredentialOffer } from '@jolocom/protocol-ts'
import { CustomCredentialOffer } from './customCredentialOffer'

@injectable()
export class CustomCredentialOfferFactory {
  public create(customCredentialOffer: CustomCredentialOffer): CredentialOffer {
    return {
      type: customCredentialOffer.type,
      renderInfo: {
        renderAs: customCredentialOffer.renderAs,
      },
      credential: {
        name: customCredentialOffer.name,
        schema: customCredentialOffer.schema,
        display: customCredentialOffer.display,
      },
    }
  }
}
