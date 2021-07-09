import 'reflect-metadata'
import './controller'
import config from './config/config'
import * as bodyParser from 'body-parser'
import { container } from './config/container.config'
import { InversifyExpressServer } from 'inversify-express-utils'

const server = new InversifyExpressServer(container, null, { rootPath: `/api/${config.apiVersion}` })

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
})

const app = server.build()

app.listen(config.port)
