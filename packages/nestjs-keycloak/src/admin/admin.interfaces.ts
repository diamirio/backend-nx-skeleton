import { ConnectionConfig } from '@keycloak/keycloak-admin-client/lib/client'
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth'

/**
 * Options for creating a Keycloak admin client.
 */
export interface KeycloakAdminOptions {
  /** Initial connection that should be made with the master administrator account that can access all the realms or realm-management account. */
  initialize: ConnectionConfig
  /** Administration user credentials and client. */
  authentication: Credentials
  /** Realm to be managed. */
  configuration: ConnectionConfig
}
