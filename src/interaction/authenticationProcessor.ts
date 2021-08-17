import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { injectable } from 'inversify'
import { strict as assert } from 'assert'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

/**
 * This implementation responsible for processing of {@link FlowType.Authentication} interactions flows callback request.
 */
@injectable()
export class AuthenticationProcessor implements InteractionProcessor {
  /**
   * {@inheritDoc}
   */
  supportedType(): FlowType {
    return FlowType.Authentication
  }

  /**
   * {@inheritDoc}
   */
  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    assert(
      interaction.flow.type === FlowType.Authentication,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.Authentication}`
    )

    await agent.processJWT(jwt)

    // Client app (SmartWallet) expects to receive initial request token
    return interaction.firstMessage
  }
}
