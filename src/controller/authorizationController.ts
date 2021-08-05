import { AppConfig } from '../config/config'
import { Request, Response } from 'express'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class AuthorizationController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
  ) {}

  public async authorizationPost(request: Request, response: Response) {
    // TODO: Add request body validation
    // TODO: Refactor in favor of strategy pattern usage
    const agent = await this.agentFactory.create()
    const token = await agent.authorizationRequestToken({
      description: request.body?.description,
      action: request.body?.action,
      imageURL: request.body?.imageURL,
      callbackURL: this.appConfig.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    response.json(requestDescription.toJSON())
  }
}
