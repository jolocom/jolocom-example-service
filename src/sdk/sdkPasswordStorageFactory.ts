import { injectable } from 'inversify'
import { FilePasswordStore } from '@jolocom/sdk-password-store-filesystem'

/**
 * Implementation responsible for {@link FilePasswordStore} instance creation.
 */
@injectable()
export class SdkPasswordStorageFactory {
  /**
   * Creates {@link FilePasswordStore} instance.
   *
   * @param {string} filePath The path to the password storage file.
   * @return {FilePasswordStore} An instance of {@link FilePasswordStore}.
   */
  public create(filePath: string): FilePasswordStore {
    return new FilePasswordStore(filePath)
  }
}
