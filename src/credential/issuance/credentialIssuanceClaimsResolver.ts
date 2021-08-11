import { injectable } from 'inversify'
import { CredentialManifestDisplayMapping } from '@jolocom/protocol-ts/lib/credential'
import { ClaimInterface } from '@jolocom/protocol-ts'
import { InvalidArgumentException } from '../../exception/invalidArgumentException'
import { classToPlain } from 'class-transformer'

/**
 * This implementation resolves all claims of the custom credential issuance offer
 * based on input data from the initial request.
 */
@injectable()
export class CredentialIssuanceClaimsResolver {
  private static readonly PATH_PREFIX = '$'

  /**
   * Resolves claims based on input data from the initial request.
   *
   * @param displayProperties Collection containing custom input from offer request
   *        ({@link CredentialManifestDisplayMapping}).
   * @return {ClaimInterface} Map of claims ({@link ClaimInterface}), where keys are claims names.
   */
  public resolve(displayProperties: CredentialManifestDisplayMapping[]): ClaimInterface {
    return Object.fromEntries(
      Object.values(displayProperties).map((property) => {
        // Asserting that required data are present
        if (!property.path || !property.path.length) {
          throw new InvalidArgumentException(
            `Can't resolve claim. Claim name must be provided. ${classToPlain(displayProperties)}.`
          )
        }

        // Asserting that required data are present
        if (!property.text) {
          throw new InvalidArgumentException(
            `Can't resolve claim. Claim value must be provided. ${classToPlain(displayProperties)}.`
          )
        }

        // Creating map of claim name to its value
        return [this.denormalizeClaimPath(property.path[0]), property.text]
      })
    )
  }

  private denormalizeClaimPath(path: string) {
    return path.charAt(0) === CredentialIssuanceClaimsResolver.PATH_PREFIX ? path.substring(2) : path
  }
}
