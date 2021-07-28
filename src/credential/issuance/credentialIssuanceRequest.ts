import { ClaimInterface } from '@jolocom/protocol-ts'
import { BaseMetadata } from 'cred-types-jolocom-core/types'

export interface CredentialIssuanceRequest {
  claim: ClaimInterface,
  metadata: BaseMetadata,
}
