import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_PROTECTED } from '../connect.constants'

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias Private
 */
export const Protected: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_PROTECTED, true)

/**
 * Makes the controller route private and require Keycloak authentication.
 * @alias Protected
 */
export const Private: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_PROTECTED, true)
