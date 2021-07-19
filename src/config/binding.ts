import { AsyncContainerModule } from 'inversify'
import { JolocomSDK } from '@jolocom/sdk'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm'
import { SdkFactory } from '../sdk/sdkFactory'
import { SdkStorageFactory } from '../sdk/sdkStorageFactory'
import { Connection } from 'typeorm/connection/Connection'
import { getDbConnection } from './db'
import config from './config'
import { SdkPasswordStorageFactory } from '../sdk/sdkPasswordStorageFactory'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'

export const binding = new AsyncContainerModule(async (bind) => {
  const connection = await getDbConnection()
  await require(config.controllersPath);

  bind<Connection>(Connection).toConstantValue(connection);
  bind<SdkStorageFactory>(SdkStorageFactory).toSelf()
  bind<SdkFactory>(SdkFactory).toSelf()
  bind<JolocomTypeormStorage>(JolocomTypeormStorage).toDynamicValue(context => {
    const storageFactory = context.container.get(SdkStorageFactory)

    return storageFactory.create()
  }).inSingletonScope()
  bind<JolocomSDK>(JolocomSDK).toDynamicValue((context) => {
    const sdkFactory = context.container.get(SdkFactory)

    return sdkFactory.create()
  }).inSingletonScope()
  bind<SdkPasswordStorageFactory>(SdkPasswordStorageFactory).toSelf()
  bind<SdkAgentFactory>(SdkAgentFactory).toSelf()
  bind<RequestDescriptionFactory>(RequestDescriptionFactory).toSelf()
})
