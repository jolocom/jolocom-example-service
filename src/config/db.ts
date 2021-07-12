import { ConnectionOptions, createConnection } from 'typeorm'
import config from './config'

export async function getDbConnection() {
  return await createConnection(config.db as ConnectionOptions);
}
