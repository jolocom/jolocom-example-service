import { AsyncContainerModule } from 'inversify'
import { JolocomSDK } from '@jolocom/sdk'
import { JolocomTypeormStorage } from '@jolocom/sdk-storage-typeorm'
import { SdkFactory } from '../sdk/sdkFactory'
import { SdkStorageFactory } from '../sdk/sdkStorageFactory'
import { Connection } from 'typeorm/connection/Connection'
import { getDbConnection } from './db'
import { AppConfig, config } from './config'
import { SdkPasswordStorageFactory } from '../sdk/sdkPasswordStorageFactory'
import { SdkAgentFactory } from '../sdk/sdkAgentFactory'
import { RequestDescriptionFactory } from '../interaction/requestDescriptionFactory'
import { ClaimsMetadata } from '../credential/claimsMetadata'
import { ClaimsMetadataProvider } from '../credential/claimsMetadataProvider'
import { CredentialOffer } from '@jolocom/protocol-ts'
import { CredentialOfferProvider } from '../credential/credentialOfferProvider'
import { claimsMetadata as defaultClaimsMetadata } from '@jolocom/protocol-ts'
import { demoCredentialOffers } from '../fixture/demoCredentialOffers'
import { demoMetaData } from '../fixture/demoMetaData'
import { TYPES } from '../types'
import { CustomCredentialOfferFactory } from '../credential/customCredentialOfferFactory'

export const binding = new AsyncContainerModule(async (bind) => {
  const connection = await getDbConnection()
  await require(config.controllersPath);

  // Config
  bind<AppConfig>(TYPES.AppConfig).toConstantValue(config);
  bind<Connection>(Connection).toConstantValue(connection);
  bind<ClaimsMetadata>(TYPES.ClaimsMetadata).toDynamicValue(context => {
    const appConfig = context.container.get<AppConfig>(TYPES.AppConfig)
    let claimsMetadata = { ...defaultClaimsMetadata }

    if (appConfig.env === 'dev') {
      claimsMetadata = { ...claimsMetadata, ...demoMetaData  }
    }

    return claimsMetadata
  })

  if (config.env === 'dev') {
    demoCredentialOffers.forEach(demoCredentialOffer => {
      bind<CredentialOffer>(TYPES.CredentialOffer).toConstantValue(demoCredentialOffer)
    })
  }

  // SDK Services
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

  // APP Services
  bind<RequestDescriptionFactory>(RequestDescriptionFactory).toSelf()
  bind<ClaimsMetadataProvider>(ClaimsMetadataProvider).toSelf()
  bind<CredentialOfferProvider>(CredentialOfferProvider).toSelf()
  bind<CustomCredentialOfferFactory>(CustomCredentialOfferFactory).toSelf()
})
