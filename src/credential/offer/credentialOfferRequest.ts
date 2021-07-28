import { CredentialDefinition, CredentialRenderTypes, ClaimInterface } from '@jolocom/protocol-ts'

export interface CredentialOfferRequest {
  name: string
  type: string
  schema: string
  claims: ClaimInterface
  renderAs: CredentialRenderTypes
  display: CredentialDefinition['display']
}
