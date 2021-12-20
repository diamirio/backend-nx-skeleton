import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_GROUPS } from '@connect/connect.constants'

/**
 * Inject current user Keycloak group in to a variable.
 * @alias {KeycloakGroups,Groups}
 */
export const KeycloakGroups: (...groups: string[]) => CustomDecorator<symbol> = (...groups: string[]) => SetMetadata(KEYCLOAK_CONNECT_METADATA_GROUPS, groups)

/**
 * Inject current user Keycloak group in to a variable.
 * @alias {KeycloakGroups,Groups}
 * @deprecated Use KeycloakGroups instead because of the more generic naming scheme.
 */
export const Groups: typeof KeycloakGroups = KeycloakGroups
