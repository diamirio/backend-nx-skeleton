import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_ROLES } from '@connect/connect.constants'

/**
 * Inject current Keycloak users roles in to a variable.
 */
export const Roles: (...roles: string[]) => CustomDecorator<symbol> = (...roles: string[]) => SetMetadata(KEYCLOAK_CONNECT_METADATA_ROLES, roles)
