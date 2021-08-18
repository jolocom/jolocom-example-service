import { CredentialIssuanceRequest } from './credentialIssuanceRequest'
import { CredentialOfferFlowState } from '@jolocom/sdk/js/interactionManager/types'
import { InvalidArgumentException } from '../../exception/invalidArgumentException'
import { serialize } from 'class-transformer'
import { CredentialIssuanceMetadataFactory } from './credentialIssuanceMetadataFactory'
import { CredentialIssuanceClaimsResolver } from './credentialIssuanceClaimsResolver'
import { injectable } from 'inversify'

/**
 * This implementation creates representation of request for issuing selected credentials.
 */
@injectable()
export class CredentialIssuanceRequestFactory {
  constructor(
    private readonly credentialIssuanceMetadataFactory: CredentialIssuanceMetadataFactory,
    private readonly credentialIssuanceClaimsResolver: CredentialIssuanceClaimsResolver
  ) {}

  /**
   * Creates representation of request for issuing selected credentials.
   *
   * @param {CredentialOfferFlowState} state The state of the offer.
   * @param {string} type The type of selected offer.
   * @param {string} responderDid Did of interaction 'responder'.
   * @return {CredentialIssuanceRequest} Representation of request for issuing selected credentials process
   * ({@link CredentialIssuanceRequest}).
   */
  public create(state: CredentialOfferFlowState, type: string, responderDid: string | undefined): CredentialIssuanceRequest {
    const offer = state.offerSummary.find(offer => offer.type === type)

    // Asserting that required data are present
    if (!offer || !offer.credential) {
      throw new InvalidArgumentException(
        `Interaction request processing failed. Provided invalid Offer with value: '${offer ? serialize(offer) : offer}'`
      )
    }

    // Asserting that required data are present
    if (!offer.credential.name) {
      throw new InvalidArgumentException(
        `Interaction request processing failed. Expected 'Offer#credential#name' to be defined.`
      )
    }

    // Preparing claims based on input data from the initial request
    const claims = this.credentialIssuanceClaimsResolver.resolve(offer.credential, responderDid);

    return {
      claim: claims,
      metadata: this.credentialIssuanceMetadataFactory.create(type, offer.credential.name, claims)
    }
  }
}
