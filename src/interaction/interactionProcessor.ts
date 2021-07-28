import { FlowType } from '@jolocom/sdk/js/interactionManager/types'
import { Agent } from '@jolocom/sdk'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'

export interface InteractionProcessor {
  supportedType(): FlowType
  process(jwt: string, agent: Agent): Promise<JSONWebToken<any>>
}
