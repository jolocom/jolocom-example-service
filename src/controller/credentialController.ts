import { AppConfig } from '../config/config'
import { StaticClaimsMetadataProvider } from '../credential/staticClaimsMetadataProvider'
import { StaticCredentialOfferProvider } from '../credential/offer/staticCredentialOfferProvider'
import { SdkAgentProvider } from '../sdk/sdkAgentProvider'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { CredentialOfferRequest } from '../credential/offer/credentialOfferRequest'
import { CredentialOfferFactory } from '../credential/offer/credentialOfferFactory'
import { ICredentialRequest } from '@jolocom/protocol-ts/dist/lib/interactionTokens'
// @ts-ignore
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'

/**
 * The controller to handle all requests related to the
 * {@link FlowType.CredentialOffer} or {@link FlowType.CredentialShare} interactions processes.
 */
@injectable()
export class CredentialController {
  constructor(
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig,
    private readonly agentProvider: SdkAgentProvider,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    private readonly staticClaimsMetadataProvider: StaticClaimsMetadataProvider,
    private readonly staticCredentialOfferProvider: StaticCredentialOfferProvider,
    private readonly credentialOfferFactory: CredentialOfferFactory
  ) {}

  /**
   * An action method to receive the resource containing credential request information.
   *
   * @param request The {@link Request} object representation.
   * @param response The {@link Response} object representation.
   * @return {Promise<void>}
   */
  public async requestPost(request: Request, response: Response) {
    // TODO: Validation of credential type availability
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const credentialRequirements: ICredentialRequest[] = request.body.types.map((type: string) => ({
      type: this.staticClaimsMetadataProvider.getByType(type).type
    }))
    const agent = await this.agentProvider.provide()
    const token = await agent.credRequestToken({
      credentialRequirements,
      callbackURL: this.appConfig.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }

  /**
   * An action method to receive the resource containing credential offer request information.
   *
   * @param request The {@link Request} object representation.
   * @param response The {@link Response} object representation.
   * @return {Promise<void>}
   */
  public async offerPost(request: Request, response: Response) {
    // TODO: Validation of credential type availability
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const offeredCredentials: CredentialOfferRequest[] = request.body.types.map(
      (type: string) => this.staticCredentialOfferProvider.getByType(type)
    )
    const agent = await this.agentProvider.provide()
    const token = await agent.credOfferToken({
      offeredCredentials,
      callbackURL: this.appConfig.sdk.callbackUrl
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }

  /**
   * An action method to receive the resource containing custom credential offer request information.
   *
   * @param request The {@link Request} object representation.
   * @param response The {@link Response} object representation.
   * @return {Promise<void>}
   */
  public async offerCustomPost(request: Request, response: Response) {
    // TODO: Validation of the request body
    // will be performed by the swagger validator after "Design first" approach implementation
    // TODO: Refactor in favor of strategy pattern usage
    const offeredCredentials: CredentialOfferRequest[] = request.body.map(
      (offer: CredentialOfferRequest) => this.credentialOfferFactory.create(offer)
    )
    const agent = await this.agentProvider.provide()
    const token = await agent.credOfferToken({
      offeredCredentials,
      callbackURL: this.appConfig.sdk.callbackUrl
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }
}
