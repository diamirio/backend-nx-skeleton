import type { CustomDecorator } from '@nestjs/common'
import { SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_SCOPES } from '@connect/connect.constants'
import type { ScopesOption } from '@connect/connect.interfaces'

/**
 * Inject current Keycloak user client scopes in to a variable.
 * @alias {KeycloakScopes,Scopes}
 */
export const KeycloakScopes: (...list: ScopesOption[]) => CustomDecorator<symbol> = (...list: ScopesOption[]) =>
  SetMetadata(
    KEYCLOAK_CONNECT_METADATA_SCOPES,
    list.reduce((scopes, options) => ({ ...scopes, ...options }), {})
  )

/**
 * Inject current Keycloak user client scopes in to a variable.
 * @alias {KeycloakScopes,Scopes}
 * @deprecated Use KeycloakScopes instead because of the more generic naming scheme.
 */
export const Scopes: typeof KeycloakScopes = KeycloakScopes
