import { controller, httpPost } from 'inversify-express-utils'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { Request } from 'express'
import config from '../config/config'

@controller('/authentication')
export class AuthenticationController {
  constructor(
    private readonly agentFactory: SdkAgentFactory,
    private readonly requestDescriptionFactory: RequestDescriptionFactory,
  ) {}

  @httpPost('/')
  public async post(request: Request) {
    const agent = await this.agentFactory.create()
    // TODO: Refactor in favor of strategy pattern usage
    const token = await agent.authRequestToken({
      description: request.body?.description,
      callbackURL: config.sdk.callbackUrl,
    })
    const requestDescription = await this.requestDescriptionFactory.create(token)

    return requestDescription.toJSON()
  }
}
