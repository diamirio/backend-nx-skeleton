import type { KeycloakConnectUser } from '@connect/connect.interfaces'

export interface AuthGuardRequestAttachment {
  token: string
  user: KeycloakConnectUser
}
