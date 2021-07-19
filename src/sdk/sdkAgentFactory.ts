import { SdkPasswordStorageFactory } from './sdkPasswordStorageFactory'
import { AppConfig } from '../config/config'
import { JolocomSDK } from '@jolocom/sdk'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class SdkAgentFactory {
  constructor(
    private readonly passwordStorageFactory: SdkPasswordStorageFactory,
    private readonly sdk: JolocomSDK,
    @inject(TYPES.AppConfig) private readonly appConfig: AppConfig
) {}

  public async create() {
    const passwordStore = this.passwordStorageFactory.create(this.appConfig.sdk.passwordFilePath)

    return await this.sdk.initAgent({ passwordStore: passwordStore })
  }
}
