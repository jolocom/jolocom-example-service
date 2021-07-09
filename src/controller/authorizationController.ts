import { controller, httpPost } from 'inversify-express-utils'

@controller('/authorization')
export class AuthorizationController {
  @httpPost('/')
  public async post() {
    // TODO: Implement
    return ''
  }
}
