import { injectable, multiInject } from 'inversify'
import { Agent } from '@jolocom/sdk'
import { InteractionProcessor } from './interactionProcessor'
import { TYPES } from '../types'
import { RuntimeException } from '../exception/runtimeException'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { logger } from '../config/logger'

@injectable()
export class InteractionRequestHandler {
  constructor(
    @multiInject(TYPES.InteractionProcessor) private readonly processors: InteractionProcessor[]
  ) {}

  public async handle(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    const processor = await this.getProcessor(jwt, agent)
    let token: JSONWebToken<any>

    try {
      token = await processor.process(jwt, agent)
    } catch (error) {
      throw new RuntimeException(
        `Unable to process interaction with type '${processor.supportedType()}'. ${error}.`
      )
    }

    logger.info(
      `'${processor.supportedType()}' interaction request processed successfully. Token nonce: '${token.nonce}'.`
    )

    return token
  }

  private async getProcessor(jwt: string, agent: Agent): Promise<InteractionProcessor> {
    const interaction = await agent.findInteraction(jwt)
    const processor = this.processors.find(processor => processor.supportedType() === interaction.flow.type)

    if (!processor) {
      throw new RuntimeException(`Can't find processor for '${interaction.flow.type}' interaction flow type.`)
    }

    return processor
  }
}
