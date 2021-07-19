import 'reflect-metadata'
import { config } from './config/config'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { logger } from './config/logger'
import { Container } from 'inversify'
import { binding } from './config/binding'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

(async () => {
  const container = new Container()
  await container.loadAsync(binding)
  const server = new InversifyExpressServer(container, null, { rootPath: config.apiRootPath })

  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    app.use(bodyParser.json())
    app.use(`${config.apiRootPath}/api-doc`, swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(config.swagger)))
  })

  const app = server.build()

  app.listen(config.port, () => logger.info(`Server started at ${config.schema}://${config.host}:${config.port}`))
})()
