import { CredentialDefinition, CredentialRenderTypes } from '@jolocom/protocol-ts'

export interface CustomCredentialOffer {
  name: string
  type: string
  schema: string
  claims: Record<string, string>
  renderAs: CredentialRenderTypes
  display: CredentialDefinition['display']
}
