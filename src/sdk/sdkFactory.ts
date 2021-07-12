import { injectable } from 'inversify'
import { JolocomSDK } from '@jolocom/sdk'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm/js/src'

@injectable()
export class SdkFactory {
  constructor(private readonly storage: JolocomTypeormStorage) {}

  public create() {
    // @ts-ignore
    return new JolocomSDK({ storage: this.storage })
  }
}
