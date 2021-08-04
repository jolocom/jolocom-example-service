import { AppConfig } from '../config/config'
import { ClaimsMetadataProvider } from '../credential/claimsMetadataProvider'
import { StaticCredentialOfferProvider } from '../credential/offer/staticCredentialOfferProvider'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { CredentialOfferRequest } from '../credential/offer/credentialOfferRequest'
import { CredentialOfferFactory } from '../credential/offer/credentialOfferFactory'
import { ICredentialRequest } from '@jolocom/protocol-ts/dist/lib/interactionTokens'

@injectable()
export class CredentialController {
  constructor(
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig,
    private readonly agentFactory: SdkAgentFactory,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    private readonly claimsMetadataProvider: ClaimsMetadataProvider,
    private readonly staticCredentialOfferProvider: StaticCredentialOfferProvider,
    private readonly credentialOfferFactory: CredentialOfferFactory
  ) {}

  public async requestPost(request: Request, response: Response) {
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

    response.json(requestDescription.toJSON())
  }

  public async offerPost(request: Request, response: Response) {
    // TODO: Validation of credential type availability
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const offeredCredentials: CredentialOfferRequest[] = request.body.types.map(
      (type: string) => this.staticCredentialOfferProvider.getByType(type)
    )
    const agent = await this.agentFactory.create()
    const token = await agent.credOfferToken({
      offeredCredentials,
      callbackURL: this.appConfig.sdk.callbackUrl
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }

  public async offerCustomPost(request: Request, response: Response) {
    // TODO: Validation of the request body
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const offeredCredentials: CredentialOfferRequest[] = request.body.map(
      (offer: CredentialOfferRequest) => this.credentialOfferFactory.create(offer)
    )
    const agent = await this.agentFactory.create()
    const token = await agent.credOfferToken({
      offeredCredentials,
      callbackURL: this.appConfig.sdk.callbackUrl
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }
}
