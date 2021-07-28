import { injectable } from 'inversify'
import { CredentialManifestDisplayMapping } from '@jolocom/protocol-ts/lib/credential'
import { ClaimInterface } from '@jolocom/protocol-ts'
import { InvalidArgumentException } from '../../exception/invalidArgumentException'
import { classToPlain } from 'class-transformer'

@injectable()
export class CredentialIssuanceClaimsResolver {
  private static readonly PATH_PREFIX = '$'

  public resolve(displayProperties: CredentialManifestDisplayMapping[]): ClaimInterface {
    return Object.fromEntries(
      Object.values(displayProperties).map((property) => {
        if (!property.path || !property.path.length) {
          throw new InvalidArgumentException(
            `Can't resolve claim. Claim name must be provided. ${classToPlain(displayProperties)}.`
          )
        }

        if (!property.text) {
          throw new InvalidArgumentException(
            `Can't resolve claim. Claim value must be provided. ${classToPlain(displayProperties)}.`
          )
        }

        return [this.denormalizeClaimPath(property.path[0]), property.text]
      })
    )
  }

  private denormalizeClaimPath(path: string) {
    return path.charAt(0) === CredentialIssuanceClaimsResolver.PATH_PREFIX ? path.substring(2) : path
  }
}
