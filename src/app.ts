import 'reflect-metadata'
import { config } from './config/config'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { logger } from './config/logger'
import { Container } from 'inversify'
import { binding } from './config/binding'
import { TYPES } from './types'
import { oas3ToolsObjectOriented } from '@jolocom/oas3-tools-object-oriented'

(async () => {
  const container = new Container()
  await container.loadAsync(binding)
  const server = new InversifyExpressServer(container, null, { rootPath: config.apiRootPath }, null, null, false)

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json())
    app.use(oas3ToolsObjectOriented(container.getAll(TYPES.Controller), config.swagger))
  })

  const app = server.build()

  app.listen(config.port, () => logger.info(`Server started at ${config.schema}://${config.host}:${config.port}`))
})()
