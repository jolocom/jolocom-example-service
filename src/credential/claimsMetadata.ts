import { BaseMetadata } from 'cred-types-jolocom-core/types'

/**
 * Representation of the claims metadata map.
 */
export interface ClaimsMetadata {
  [type: string]: BaseMetadata
}
