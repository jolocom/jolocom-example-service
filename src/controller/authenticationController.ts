import { AppConfig } from '../config/config'
import { controller, httpPost } from 'inversify-express-utils'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request } from 'express'
import { inject } from 'inversify'
import { TYPES } from '../types'

@controller('/authentication')
export class AuthenticationController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
  ) {}

  /**
   * @openapi
   * /api/v1/authentication:
   *   post:
   *     summary: Receive authentication request description
   *     tags:
   *       - Authentication
   *     requestBody:
   *       description: Body of the request
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Returns authentication request description.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: The token ID.
   *                 jwt:
   *                   type: string
   *                   description: The token.
   *                 qr:
   *                   type: string
   *                   description: The QR code of the JWT.
   */
  @httpPost('/')
  public async post(request: Request) {
    // TODO: Add request body validation
    // TODO: Refactor in favor of strategy pattern usage
    const agent = await this.agentFactory.create()
    const token = await agent.authRequestToken({
      description: request.body?.description,
      callbackURL: this.appConfig.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    return requestDescription.toJSON()
  }
}
