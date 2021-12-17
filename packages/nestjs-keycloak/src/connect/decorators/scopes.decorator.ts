import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_SCOPES } from '../connect.constants'
import { ScopesOption } from '../connect.interfaces'

/**
 * Inject current Keycloak user client scopes in to a variable.
 */
export const Scopes: (...list: ScopesOption[]) => CustomDecorator<symbol> = (...list: ScopesOption[]) =>
  SetMetadata(
    KEYCLOAK_CONNECT_METADATA_SCOPES,
    list.reduce((scopes, options) => ({ ...scopes, ...options }), {})
  )
