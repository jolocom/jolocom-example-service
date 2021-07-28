import { injectable } from 'inversify'
import { FilePasswordStore } from '@jolocom/sdk-password-store-filesystem'

@injectable()
export class SdkPasswordStorageFactory {
  public create(filePath: string) {
    return new FilePasswordStore(filePath)
  }
}
