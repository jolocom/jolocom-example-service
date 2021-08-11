import { AppConfig } from '../config/config'
import { SdkAgentProvider } from '../sdk/sdkAgentProvider'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
// @ts-ignore
import { FlowType } from '@jolocom/sdk/js/interactionManager/types'

/**
 * The controller to handle all requests related to the {@link FlowType.Authentication} interaction process.
 */
@injectable()
export class AuthenticationController {
  constructor(
    private readonly agentProvider: SdkAgentProvider,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
  ) {}

  /**
   * An action method to receive the resource containing {@link FlowType.Authentication} request information.
   *
   * @param request The {@link Request} object representation.
   * @param response The {@link Response} object representation.
   * @return {Promise<void>}
   */
  public async authenticationPost(request: Request, response: Response) {
    // TODO: Add request body validation
    // TODO: Refactor in favor of strategy pattern usage
    const agent = await this.agentProvider.provide()
    const token = await agent.authRequestToken({
      description: request.body?.description,
      callbackURL: this.appConfig.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }
}
