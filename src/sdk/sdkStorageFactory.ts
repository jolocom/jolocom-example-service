import { injectable } from 'inversify'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm'
import { Connection } from 'typeorm/connection/Connection'

@injectable()
export class SdkStorageFactory {
  constructor(private connection: Connection) {}

  public create() {
    return new JolocomTypeormStorage(this.connection)
  }
}
