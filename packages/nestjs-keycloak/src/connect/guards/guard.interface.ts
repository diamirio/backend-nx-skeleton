import type { KeycloakConnectUser } from '@connect/connect.interfaces'

export interface AuthGuardRequestData {
  accessToken: string
  user: KeycloakConnectUser
}
