import type { CustomDecorator } from '@nestjs/common'
import { SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_PROTECTED } from '@connect/connect.constants'

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias {KeyclaokPrivate, KeycloakProtected,Private,Protected}
 */
export const KeycloakPrivate: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_PROTECTED, true)

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias {KeyclaokPrivate, KeycloakProtected,Private,Protected}
 */
export const KeycloakProtected: typeof KeycloakPrivate = KeycloakPrivate

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias {KeyclaokPrivate, KeycloakProtected,Private,Protected}
 */
export const Private: typeof KeycloakPrivate = KeycloakPrivate

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias {KeyclaokPrivate, KeycloakProtected,Private,Protected}
 */
export const Protected: typeof KeycloakPrivate = KeycloakPrivate
