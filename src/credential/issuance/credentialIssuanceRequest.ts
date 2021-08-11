import { ClaimInterface } from '@jolocom/protocol-ts'
import { BaseMetadata } from 'cred-types-jolocom-core/types'

/**
 * Representation of request for issuing selected credentials process.
 */
export interface CredentialIssuanceRequest {
  claim: ClaimInterface,
  metadata: BaseMetadata,
}
