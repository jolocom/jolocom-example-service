import { controller, httpPost } from 'inversify-express-utils'

@controller('/authentication')
export class AuthenticationController {
  @httpPost('/')
  public async post() {
    // TODO: Implement
  }
}
