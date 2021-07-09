import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error('Couldn\'t find .env file')
}

export default {
  port: process.env.APP_PORT,
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  schema: process.env.APP_SCHEME,
  apiVersion: process.env.API_VERSION || 'v1',
}
