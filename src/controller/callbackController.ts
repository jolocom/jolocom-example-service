import { controller, httpPost } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { ErrorCode } from '@jolocom/sdk'
import { StatusCodes } from 'http-status-codes'
import { InteractionRequestHandler } from '../interaction/interactionRequestHandler'

@controller('/callback')
export class CallbackController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly interactionRequestHandler: InteractionRequestHandler,
  ) {}

  /**
   * @openapi
   * /api/v1/callback:
   *   post:
   *     summary: Process callback request
   *     tags:
   *       - Callback
   *     requestBody:
   *       description: Body of the request
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               jwt:
   *                 type: string
   *     responses:
   *       200:
   *         description: Returns (optional) token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   required: false
   *                   type: string
   *                   description: The token.
   */
  @httpPost('/')
  public async post(request: Request, response: Response) {
    const agent = await this.agentFactory.create()

    try {
      await agent.findInteraction(request.body.jwt)
    } catch (error) {
      if (error.message === ErrorCode.NoSuchInteraction) {
        return response.status(StatusCodes.NOT_FOUND).json({
          message: `Interaction with token '${request.body.jwt}' not found.`
        })
      }

      throw (error)
    }

    const token = await this.interactionRequestHandler.handle(request.body.jwt, agent)

    // TODO: Make common responce preparation and creation
    return { token: token.encode() }
  }
}
