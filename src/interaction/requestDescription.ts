import { classToPlain, Exclude, Expose } from 'class-transformer'

/**
 * Immutable representation of interaction request information.
 */
@Exclude()
export class RequestDescription {
  private readonly _id: string
  private readonly _jwt: string
  private readonly _qr: string

  constructor(id: string, jwt: string, qr: string) {
    this._id = id
    this._jwt = jwt
    this._qr = qr
  }

  /**
   * Accessor for the token nonce.
   */
  @Expose()
  get id(): string {
    return this._id
  }

  /**
   * Accessor for the encoded jwt.
   */
  @Expose()
  get jwt(): string {
    return this._jwt
  }

  /**
   * Accessor for the qr code generated based on jwt token.
   */
  @Expose()
  get qr(): string {
    return this._qr
  }

  /**
   * Responsible for the token object serialization.
   */
  public toJSON() {
    return classToPlain(this)
  }
}
