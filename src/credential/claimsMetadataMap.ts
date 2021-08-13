import { BaseMetadata } from 'cred-types-jolocom-core/types'

/**
 * Representation of the claims metadata map.
 */
export interface ClaimsMetadataMap {
  [type: string]: BaseMetadata
}
