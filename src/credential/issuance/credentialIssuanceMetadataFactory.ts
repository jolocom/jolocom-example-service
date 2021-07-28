import { injectable } from 'inversify'
import { BaseMetadata } from 'cred-types-jolocom-core/types'
import { ClaimInterface } from '@jolocom/protocol-ts'

@injectable()
export class CredentialIssuanceMetadataFactory {
  public create(type: string, name: string, claims: ClaimInterface): BaseMetadata {
    return {
      type: ['VerifiableCredential', type],
      name,
      context: [
        {
          name: 'schema:name',
          ...Object.fromEntries(
            Object.keys(claims).map((key) => ([key, `schema:${key}`])) || []
          )
        },
      ],
    }
  }
}
