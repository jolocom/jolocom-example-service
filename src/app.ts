import 'reflect-metadata'
import config from './config/config'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { logger } from './config/logger'
import { Container } from 'inversify'
import { bindings } from './config/bindings'
import swaggerUi from 'swagger-ui-express'
import { openapiSpecification } from './config/openapi'

(async () => {
  const container = new Container();
  await container.loadAsync(bindings)
  const server = new InversifyExpressServer(container, null, { rootPath: config.apiRootPath })

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json())
    app.use(`${config.apiRootPath}/api-doc`, swaggerUi.serve, swaggerUi.setup(openapiSpecification))
  })

  const app = server.build()

  app.listen(config.port, () => logger.info(`Server started at ${config.schema}://${config.host}:${config.port}`))
})()
