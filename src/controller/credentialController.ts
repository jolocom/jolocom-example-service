import { controller, httpPost } from 'inversify-express-utils'

@controller('/credential-issuance')
export class CredentialController {
  @httpPost('/')
  public async post() {
    // TODO: Implement
    return ''
  }

  @httpPost('/response')
  public async responsePost() {
    // TODO: Implement
    return ''
  }

  @httpPost('/offer')
  public async offerPost() {
    // TODO: Implement
    return ''
  }

  @httpPost('/custom')
  public async offerCustomPost() {
    // TODO: Implement
    return ''
  }
}
