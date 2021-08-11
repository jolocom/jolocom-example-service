import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { injectable } from 'inversify'
import { strict as assert } from 'assert'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

/**
 * This implementation responsible for processing of {@link FlowType.Authorization} interactions flows callback request.
 */
@injectable()
export class AuthorizationProcessor implements InteractionProcessor {
  /**
   * {@inheritDoc}
   */
  supportedType(): FlowType {
    return FlowType.Authorization
  }

  /**
   * {@inheritDoc}
   */
  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    assert(
      interaction.flow.type === FlowType.Authorization,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.Authorization}`
    )

    await agent.processJWT(jwt)

    return interaction.lastMessage
  }
}
