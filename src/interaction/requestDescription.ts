import { classToPlain, Exclude, Expose } from 'class-transformer'

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

  @Expose()
  get id(): string {
    return this._id
  }

  @Expose()
  get jwt(): string {
    return this._jwt
  }

  @Expose()
  get qr(): string {
    return this._qr
  }

  public toJSON() {
    return classToPlain(this)
  }
}
