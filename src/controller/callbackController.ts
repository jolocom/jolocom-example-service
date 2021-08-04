import { Request, Response } from 'express'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { ErrorCode } from '@jolocom/sdk'
import { StatusCodes } from 'http-status-codes'
import { InteractionRequestHandler } from '../interaction/interactionRequestHandler'
import { injectable } from 'inversify'

@injectable()
export class CallbackController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly interactionRequestHandler: InteractionRequestHandler,
  ) {}

  public async post(request: Request, response: Response) {
    const agent = await this.agentFactory.create()

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
