import QRCode from 'qrcode'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { RequestDescription } from './requestDescription'
import { injectable } from 'inversify'

/**
 * This implementation responsible for creation of interaction request description instance.
 */
@injectable()
export class RequestDescriptionFactory {
  /**
   * Creates interaction {@link RequestDescription} instance.
   *
   * @param {JSONWebToken<any>} token The token representation.
   * @return {Promise<RequestDescription>} Interaction {@link RequestDescription} instance.
   */
  public async create(token: JSONWebToken<any>): Promise<RequestDescription> {
    const tokenEncoded = token.encode()
    const qr = await QRCode.toDataURL(tokenEncoded)

    return new RequestDescription(token.nonce, tokenEncoded, qr)
  }
}
