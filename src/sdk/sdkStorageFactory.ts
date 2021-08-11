import { injectable } from 'inversify'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm'
import { Connection } from 'typeorm/connection/Connection'

/**
 * Implementation responsible for {@link JolocomTypeormStorage} instance creation.
 */
@injectable()
export class SdkStorageFactory {
  constructor(private connection: Connection) {}

  /**
   * Creates {@link JolocomTypeormStorage} instance.
   *
   * @return {JolocomTypeormStorage} An instance of {@link JolocomTypeormStorage}.
   */
  public create(): JolocomTypeormStorage {
    return new JolocomTypeormStorage(this.connection)
  }
}
