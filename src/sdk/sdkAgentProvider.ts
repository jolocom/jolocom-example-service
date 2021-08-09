import { SdkPasswordStorageFactory } from './sdkPasswordStorageFactory'
import { AppConfig } from '../config/config'
import { JolocomSDK } from '@jolocom/sdk'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { Agent } from '@jolocom/sdk/js/agent'

@injectable()
export class SdkAgentProvider {
  private agent: Agent | null = null

  constructor(
    private readonly passwordStorageFactory: SdkPasswordStorageFactory,
    private readonly sdk: JolocomSDK,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
) {}

  public async provide(): Promise<Agent> {
    if (this.agent) {
      return this.agent
    }

    const passwordStore = this.passwordStorageFactory.create(this.appConfig.sdk.passwordFilePath)

    this.agent = await this.sdk.initAgent({ passwordStore: passwordStore })

    return this.agent
  }
}
