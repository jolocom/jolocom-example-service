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
import { StaticCredentialOfferProvider } from '../credential/offer/staticCredentialOfferProvider'
import { claimsMetadata as defaultClaimsMetadata } from '@jolocom/protocol-ts'
import { demoCredentialOffers } from '../fixture/demoCredentialOffers'
import { demoMetaData } from '../fixture/demoMetaData'
import { TYPES } from '../types'
import { CredentialOfferFactory } from '../credential/offer/credentialOfferFactory'
import { InteractionProcessor } from '../interaction/interactionProcessor'
import { AuthenticationProcessor } from '../interaction/authenticationProcessor'
import { InteractionRequestHandler } from '../interaction/interactionRequestHandler'
import { AuthorizationProcessor } from '../interaction/authorizationProcessor'
import { CredentialShareProcessor } from '../interaction/credentialShareProcessor'
import { CredentialIssuanceOfferProcessor } from '../interaction/credentialIssuanceOfferProcessor'
import { CredentialIssuanceMetadataFactory } from '../credential/issuance/credentialIssuanceMetadataFactory'
import { CredentialIssuanceClaimsResolver } from '../credential/issuance/credentialIssuanceClaimsResolver'
import { CredentialIssuanceRequestFactory } from '../credential/issuance/credentialIssuanceRequestFactory'
import {
  AuthenticationController,
  AuthorizationController,
  CallbackController,
  CredentialController,
} from '../controller'

export const binding = new AsyncContainerModule(async (bind) => {
  const connection = await getDbConnection()

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

  // Controllers
  bind(TYPES.Controller).to(AuthenticationController)
  bind(TYPES.Controller).to(AuthorizationController)
  bind(TYPES.Controller).to(CallbackController)
  bind(TYPES.Controller).to(CredentialController)

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
  bind<StaticCredentialOfferProvider>(StaticCredentialOfferProvider).toSelf()
  bind<CredentialOfferFactory>(CredentialOfferFactory).toSelf()
  bind<InteractionProcessor>(TYPES.InteractionProcessor).to(AuthenticationProcessor)
  bind<InteractionProcessor>(TYPES.InteractionProcessor).to(AuthorizationProcessor)
  bind<InteractionProcessor>(TYPES.InteractionProcessor).to(CredentialShareProcessor)
  bind<InteractionProcessor>(TYPES.InteractionProcessor).to(CredentialIssuanceOfferProcessor)
  bind<InteractionRequestHandler>(InteractionRequestHandler).toSelf()
  bind<CredentialIssuanceMetadataFactory>(CredentialIssuanceMetadataFactory).toSelf()
  bind<CredentialIssuanceClaimsResolver>(CredentialIssuanceClaimsResolver).toSelf()
  bind<CredentialIssuanceRequestFactory>(CredentialIssuanceRequestFactory).toSelf()
})
