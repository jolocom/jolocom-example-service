import { Oas3ToolsObjectOrientedOptions } from '@jolocom/oas3-tools-object-oriented'

/**
 * Oas3 application configuration definition.
 */
export const oas3AppOptions = (apiSpec: string) => ({
  openApiValidator: {
    apiSpec,
    validateRequests: true,
    validateResponses: true,
  }
} as Oas3ToolsObjectOrientedOptions)
