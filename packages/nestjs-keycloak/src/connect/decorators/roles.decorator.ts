import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_ROLES } from '@connect/connect.constants'

/**
 * Inject current Keycloak users roles in to a variable.
 * @alias {KeycloakRoles,Roles}
 */
export const KeycloakRoles: (...roles: string[]) => CustomDecorator<symbol> = (...roles: string[]) => SetMetadata(KEYCLOAK_CONNECT_METADATA_ROLES, roles)

/**
 * Inject current Keycloak users roles in to a variable.
 * @alias {KeycloakRoles,Roles}
 * @deprecated Use KeycloakRoles instead because of the more generic naming scheme.
 */
export const Roles: typeof KeycloakRoles = KeycloakRoles
