import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_GROUPS } from '../connect.constants'

/**
 * Inject current user Keycloak group in to a variable.
 */
export const Groups: (...groups: string[]) => CustomDecorator<symbol> = (...groups: string[]) => SetMetadata(KEYCLOAK_CONNECT_METADATA_GROUPS, groups)
