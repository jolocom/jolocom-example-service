import 'reflect-metadata'
import './controller'
import config from './config/config'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { logger } from './config/logger'

const server = new InversifyExpressServer(container, null, { rootPath: `/api/${config.apiVersion}` })

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
})

const app = server.build()

app.listen(config.port, () => logger.info(`Server started at ${config.schema}://${config.host}:${config.port}`))
