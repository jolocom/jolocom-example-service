import { Request, Response } from 'express'
import { SdkAgentProvider } from '../sdk/sdkAgentProvider'
import { ErrorCode } from '@jolocom/sdk'
import { StatusCodes } from 'http-status-codes'
import { InteractionRequestHandler } from '../interaction/interactionRequestHandler'
import { injectable } from 'inversify'

@injectable()
export class CallbackController {
  constructor(
    private readonly agentProvider: SdkAgentProvider,
    private readonly interactionRequestHandler: InteractionRequestHandler,
  ) {}

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
