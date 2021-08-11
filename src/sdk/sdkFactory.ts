import { injectable } from 'inversify'
import { JolocomSDK } from '@jolocom/sdk'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm'

/**
 * Implementation responsible for {@link JolocomSDK} instance creation.
 */
@injectable()
export class SdkFactory {
  constructor(private readonly storage: JolocomTypeormStorage) {}

  /**
   * Creates {@link JolocomSDK} instance.
   *
   * @return {JolocomSDK} An instance of {@link JolocomSDK}.
   */
  public create(): JolocomSDK {
    // @ts-ignore
    return new JolocomSDK({ storage: this.storage })
  }
}
