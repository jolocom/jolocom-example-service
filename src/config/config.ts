import appRootDir from 'app-root-path'
import dotenv from 'dotenv'
import { Assert } from '../assert/assert'

process.env.NODE_ENV = process.env.APP_ENV || 'dev';
process.env.API_VERSION = process.env.API_VERSION || 'v1';

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error('Couldn\'t find .env file')
}

const assertRequiredVariablesDefined = () => {
  Assert.issDefined(process.env.APP_PORT, 'process.env.APP_PORT')
  Assert.issDefined(process.env.APP_ENV, 'process.env.APP_ENV')
  Assert.issDefined(process.env.APP_HOST, 'process.env.APP_HOST')
  Assert.issDefined(process.env.APP_SCHEME, 'process.env.APP_SCHEME')
  Assert.issDefined(process.env.SDK_CALLBACK_URL, 'process.env.SDK_CALLBACK_URL')
}

assertRequiredVariablesDefined()

export default {
  port: process.env.APP_PORT,
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  schema: process.env.APP_SCHEME,
  apiVersion: process.env.API_VERSION as string,
  apiRootPath: '/api/' + process.env.API_VERSION,
  controllersPath: appRootDir + '/src/controller',

  sdk: {
    passwordFilePath: process.env.SDK_PASSWORD_FILE_PATH || appRootDir + '/var/password.txt',
    callbackUrl: process.env.SDK_CALLBACK_URL as string,
  },

  db: {
    type: 'sqlite',
    database: appRootDir + '/var/db.sqlite3',
    logging: ['error', 'warn', 'schema'],
    entities: [...require('@jolocom/sdk-storage-typeorm').entityList],
    migrations: [appRootDir + '/migration/*.ts'],
    migrationsRun: true,
    synchronize: true,
    cli: {
      migrationsDir: appRootDir + '/migration',
    },
  },

  logger: {
    logDir: process.env.LOG_DIR || appRootDir + '/var/log',
  }
}
