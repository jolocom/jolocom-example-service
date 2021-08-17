import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { strict as assert } from 'assert'
import { injectable } from 'inversify'

/**
 * This implementation responsible for processing of {@link FlowType.CredentialShare} interactions flows callback request.
 */
@injectable()
export class CredentialShareProcessor implements InteractionProcessor {
  /**
   * {@inheritDoc}
   */
  supportedType(): FlowType {
    return FlowType.CredentialShare
  }

  /**
   * {@inheritDoc}
   */
  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    assert(
      interaction.flow.type === FlowType.CredentialShare,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.CredentialShare}`
    )

    await agent.processJWT(jwt)

    // Client app (SmartWallet) expects to receive initial request token
    return interaction.firstMessage
  }
}
