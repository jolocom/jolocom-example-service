import { AppConfig } from '../config/config'
import { controller, httpPost } from 'inversify-express-utils'
import { ClaimsMetadataProvider } from '../credential/claimsMetadataProvider'
import { CredentialOfferProvider } from '../credential/credentialOfferProvider'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request } from 'express'
import { inject } from 'inversify'
import { TYPES } from '../types'
import { CredentialOffer } from '@jolocom/protocol-ts'
import { ICredentialRequest } from '@jolocom/protocol-ts/dist/lib/interactionTokens'

@controller('/credential-issuance')
export class CredentialController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    private readonly claimsMetadataProvider: ClaimsMetadataProvider,
    private readonly credentialOfferProvider: CredentialOfferProvider,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
  ) {}

  @httpPost('/')
  public async post() {
    // TODO: Implement
    return ''
  }

  /**
   * @openapi
   * /api/v1/credential-issuance/request:
   *   post:
   *     summary: Receive credential issuance request description
   *     tags:
   *       - Credential Issuance
   *     requestBody:
   *       description: Body of the request
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               types:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Returns credential issuance request description.
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
  @httpPost('/request')
  public async requestPost(request: Request) {
    // TODO: Validation of credential type availability
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const credentialRequirements: ICredentialRequest[] = request.body.types.map((type: string) => ({
      type: this.claimsMetadataProvider.getByType(type).type
    }))
    const agent = await this.agentFactory.create()
    const token = await agent.credRequestToken({
      credentialRequirements,
      callbackURL: this.appConfig.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    return requestDescription.toJSON()
  }

  /**
   * @openapi
   * /api/v1/credential-issuance/offer:
   *   post:
   *     summary: Receive credential issuance offer request description
   *     tags:
   *       - Credential Issuance
   *     requestBody:
   *       description: Body of the request
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               types:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Returns credential issuance offer request description.
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
  @httpPost('/offer')
  public async offerPost(request: Request) {
    // TODO: Validation of credential type availability
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const offeredCredentials: CredentialOffer[] = request.body.types.map(
      (type: string)  => this.credentialOfferProvider.getByType(type)
    )
    const agent = await this.agentFactory.create()
    const token = await agent.credOfferToken({
      offeredCredentials,
      callbackURL: this.appConfig.sdk.callbackUrl
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    return requestDescription.toJSON()
  }

  @httpPost('/custom')
  public async offerCustomPost() {
    // TODO: Implement
    return ''
  }
}
