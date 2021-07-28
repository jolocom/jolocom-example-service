import { InteractionProcessor } from './interactionProcessor'
import { Agent } from '@jolocom/sdk'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { Assert } from '../assert/assert'
import { injectable } from 'inversify'

@injectable()
export class CredentialShareProcessor implements InteractionProcessor {
  supportedType(): FlowType {
    return FlowType.CredentialShare
  }

  async process(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const interaction = await agent.findInteraction(jwt)

    Assert.true(
      interaction.flow.type === FlowType.CredentialShare,
      `Interaction request processing failed. Unsupported interaction flow type, expected ${FlowType.CredentialShare}`
    )

    await agent.processJWT(jwt)

    return interaction.lastMessage
  }
}
