import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { Agent } from '@jolocom/sdk'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

/**
 * Abstraction implementers of which will be responsible for processing
 * of each concrete interactions flows callback request.
 */
export interface InteractionProcessor {
  /**
   * Returns supported concrete flow type.
   *
   * @return {string} FlowType The {@link FlowType} supported by concrete implementation.
   */
  supportedType(): FlowType

  /**
   * Processes interaction and returns its jwt.
   *
   * @param {string} jwt Encoded jwt representation to be processed.
   * @param {Agent} agent The {@link Agent} instance related to which will be performed jwt processing.
   * @return {Promise<JSONWebToken<any>>} The {@link JSONWebToken} representation of the latest interaction message.
   */
  process(jwt: string, agent: Agent): Promise<JSONWebToken<any>>
}
