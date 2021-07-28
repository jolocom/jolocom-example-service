import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { injectable } from 'inversify'
import { Assert } from '../assert/assert'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

@injectable()
export class AuthenticationProcessor implements InteractionProcessor {
  supportedType(): FlowType {
    return FlowType.Authentication
  }

  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    Assert.true(
      interaction.flow.type === FlowType.Authentication,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.Authentication}`
    )

    await agent.processJWT(jwt)

    return interaction.lastMessage
  }
}
