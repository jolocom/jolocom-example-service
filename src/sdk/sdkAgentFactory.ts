import { SdkPasswordStorageFactory } from './sdkPasswordStorageFactory'
import config from '../config/config'
import { JolocomSDK } from '@jolocom/sdk'
import { injectable } from 'inversify'

@injectable()
export class SdkAgentFactory {
  constructor(
    private readonly passwordStorageFactory: SdkPasswordStorageFactory,
    private readonly sdk: JolocomSDK,
) {}

  public async create() {
    // TODO: Define passwordFilePath config as constructor injectable arg
    const passwordStore = this.passwordStorageFactory.create(config.sdk.passwordFilePath)

    return await this.sdk.initAgent({ passwordStore: passwordStore })
  }
}
