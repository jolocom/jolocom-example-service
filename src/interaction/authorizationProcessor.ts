import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { injectable } from 'inversify'
import { Assert } from '../assert/assert'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

@injectable()
export class AuthorizationProcessor implements InteractionProcessor {
  supportedType(): FlowType {
    return FlowType.Authorization
  }

  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    Assert.true(
      interaction.flow.type === FlowType.Authorization,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.Authorization}`
    )

    await agent.processJWT(jwt)

    return interaction.lastMessage
  }
}
