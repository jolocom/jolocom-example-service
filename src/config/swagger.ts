import { Options } from 'swagger-jsdoc'
import appRootDir from 'app-root-path'

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jolocom Example Service API',
      description: 'Example of service API with usage of Jolocom SDK',
      contact: {
        name: 'Jolocom Dev',
        email: 'dev@jolocom.com'
      },
      version: '1.0.0',
    },
  },
  apis: [ appRootDir + '/src/controller/*Controller.ts']
}
