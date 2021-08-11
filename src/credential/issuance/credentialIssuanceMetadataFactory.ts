import { injectable } from 'inversify'
import { BaseMetadata } from 'cred-types-jolocom-core/types'
import { ClaimInterface } from '@jolocom/protocol-ts'

/**
 * This implementation creates metadata representation for the credential issuance.
 */
@injectable()
export class CredentialIssuanceMetadataFactory {
  /**
   * Creates metadata representation required for the selected credential issuance.
   *
   * @param {string} type The type of selected offer.
   * @param {string} name The name of selected offer.
   * @param {ClaimInterface} claims Map of claims ({@link ClaimInterface}), where keys are claims names.
   * @return {BaseMetadata} Metadata representation ({@link BaseMetadata}).
   */
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
