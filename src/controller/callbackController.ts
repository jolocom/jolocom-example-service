import { controller, httpPost } from 'inversify-express-utils'

@controller('/callback')
export class CallbackController {
  @httpPost('/')
  public async post() {
    // TODO: Implement
    return ''
  }
}
