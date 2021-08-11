import { injectable, multiInject } from 'inversify'
import { Agent } from '@jolocom/sdk'
import { InteractionProcessor } from './interactionProcessor'
import { TYPES } from '../types'
import { RuntimeException } from '../exception/runtimeException'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { logger } from '../config/logger'

/**
 * This implementation responsible for processing of all interactions callback requests.
 */
@injectable()
export class InteractionRequestHandler {
  constructor(
    @multiInject(TYPES.InteractionProcessor) private readonly processors: InteractionProcessor[]
  ) {}

  /**
   * Processing of all interactions callback requests.
   *
   * @param {string} jwt Encoded jwt representation to be processed.
   * @param {Agent} agent The {@link Agent} instance related to which will be performed jwt processing.
   * @return {Promise<JSONWebToken<any>>} The {@link JSONWebToken} representation of the latest interaction message.
   */
  public async handle(jwt: string, agent: Agent): Promise<JSONWebToken<any>> {
    // Defining appropriate processor based on provided jwt type
    const processor = await this.getProcessor(jwt, agent)
    let token: JSONWebToken<any>

    try {
      // Processing jwt and receiving token of the latest interaction message
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
    // Fetching interaction instance to define processor type based on provided jwt
    const interaction = await agent.findInteraction(jwt)
    // Defining appropriate processor based on interaction flow type
    const processor = this.processors.find(processor => processor.supportedType() === interaction.flow.type)

    if (!processor) {
      throw new RuntimeException(`Can't find processor for '${interaction.flow.type}' interaction flow type.`)
    }

    return processor
  }
}
