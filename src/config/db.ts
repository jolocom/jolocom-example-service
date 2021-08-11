import { ConnectionOptions, createConnection } from 'typeorm'
import { config } from './config'

/**
 * Setting up connection with the DB.
 */
export async function getDbConnection() {
  return await createConnection(config.db as ConnectionOptions);
}
