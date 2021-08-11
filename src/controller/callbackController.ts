import { Request, Response } from 'express'
import { SdkAgentProvider } from '../sdk/sdkAgentProvider'
import { ErrorCode } from '@jolocom/sdk'
import { StatusCodes } from 'http-status-codes'
import { InteractionRequestHandler } from '../interaction/interactionRequestHandler'
import { injectable } from 'inversify'
// @ts-ignore
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'

/**
 * The controller to handle all interactions callback requests.
 */
@injectable()
export class CallbackController {
  constructor(
    private readonly agentProvider: SdkAgentProvider,
    private readonly interactionRequestHandler: InteractionRequestHandler,
  ) {}

  /**
   * An action method to process interactions callback request for all {@link FlowType} types.
   * In response will be received encoded processed interaction message jwt.
   *
   * @param request The {@link Request} object representation.
   * @param response The {@link Response} object representation.
   * @return {Promise<void>}
   */
  public async callbackPost(request: Request, response: Response) {
    const agent = await this.agentProvider.provide()

    try {
      await agent.findInteraction(request.body.jwt)
    } catch (error) {
      if (error.message === ErrorCode.NoSuchInteraction) {
        response.status(StatusCodes.NOT_FOUND).json({
          message: `Interaction with token '${request.body.jwt}' not found.`
        })
      }

      throw (error)
    }

    const token = await this.interactionRequestHandler.handle(request.body.jwt, agent)

    // TODO: Make common responce preparation and creation
    response.json({ token: token.encode() })
  }
}
