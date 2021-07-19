import { config } from './config'
import { Configuration, configure, getLogger } from 'log4js';

//TODO: Implement decorator to pass logger with DI
const devConfig: Configuration = {
  appenders: {
    dev: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['dev'], level: 'debug' },
  }
}
const prodConfig: Configuration = {
  appenders: {
    prod: { type: 'file', filename: `${config.logger.logDir}/prod.log` },
  },
  categories: {
    default: { appenders: ['prod'], level: 'error' },
  }
}

configure(
  config.env === 'prod' ? prodConfig : devConfig
)

export const logger = getLogger()
