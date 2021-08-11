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
  // Service container initialization.
  const container = new Container()
  // Load all "bindings" (services) into the service container.
  await container.loadAsync(binding)
  // Initialization of the inversify server app with configured service container.
  const server = new InversifyExpressServer(container, null, { rootPath: config.apiRootPath }, null, null, false)

  // Sets the configuration function to be applied to the application (attaching middlewares).
  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json())
    // Attach middleware to wire up oas3 declaration with controllers methods.
    app.use(oas3ToolsObjectOriented(container.getAll(TYPES.Controller), config.swagger))
  })

  // Applies all routes and configuration to the server, returning the express application.
  const app = server.build()

  // Listening for connections.
  app.listen(config.port, () => logger.info(`Server started at ${config.schema}://${config.host}:${config.port}`))
})()
