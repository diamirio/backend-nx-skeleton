import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { KEYCLOAK_CONNECT_METADATA_UNPROTECTED } from '@connect/connect.constants'

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}
 */
export const KeycloakPublic: () => CustomDecorator<symbol> = () => SetMetadata(KEYCLOAK_CONNECT_METADATA_UNPROTECTED, true)

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}
 */
export const KeycloakUnprotected: typeof KeycloakPublic = KeycloakPublic

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}
 */
export const Public: typeof KeycloakPublic = KeycloakPublic

/**
 * Makes the controller route public and does not require Keycloak authentication.
 * @alias {KeycloakPublic,KeycloakUnprotected,Public,Unprotected}
 */
export const Unprotected: typeof KeycloakPublic = KeycloakPublic
