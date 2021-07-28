import QRCode from 'qrcode'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { RequestDescription } from './requestDescription'
import { injectable } from 'inversify'

@injectable()
export class RequestDescriptionFactory {
  public async create(token: JSONWebToken<any>) {
    const tokenEncoded = token.encode()
    const qr = await QRCode.toDataURL(tokenEncoded)

    return new RequestDescription(token.nonce, tokenEncoded, qr)
  }
}
