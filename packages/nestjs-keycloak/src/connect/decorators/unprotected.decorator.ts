import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_UNPROTECTED } from '@connect/connect.constants'

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias Public
 */
export const Unprotected: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_UNPROTECTED, true)

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias Unprotected
 */
export const Public: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_UNPROTECTED, true)
