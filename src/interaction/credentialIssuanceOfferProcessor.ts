import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { CredentialOfferFlowState, FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { Assert } from '../assert/assert'
import { injectable } from 'inversify'
import { CredentialIssuanceRequestFactory } from '../credential/issuance/credentialIssuanceRequestFactory'

/**
 * This implementation responsible for processing of {@link FlowType.CredentialOffer} interactions flows callback request.
 */
@injectable()
export class CredentialIssuanceOfferProcessor implements InteractionProcessor {
  constructor(private readonly credentialIssuanceRequestFactory: CredentialIssuanceRequestFactory) {}

  /**
   * {@inheritDoc}
   */
  supportedType(): FlowType {
    return FlowType.CredentialOffer
  }

  /**
   * {@inheritDoc}
   */
  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    Assert.true(
      interaction.flow.type === FlowType.CredentialOffer,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.CredentialOffer}`
    )

    await agent.processJWT(jwt)

    const state = interaction.getSummary().state as CredentialOfferFlowState
    const credentialIssuanceRequestsMap = state.selectedTypes.reduce((map, selectedType: string) => ({
      ...map, [selectedType]: async () => this.credentialIssuanceRequestFactory.create(state, selectedType)
    }), {})
    const credentials = await interaction.issueSelectedCredentials(credentialIssuanceRequestsMap)
    const token = await interaction.createCredentialReceiveToken(credentials)

    await agent.processJWT(token)

    return token
  }
}
