export interface KeycloakConnectOptions {
  // keycloak connect config
  realm: string
  resource: string
  credentials: {
    secret: string
  }
  'auth-server-url': string
  'ssl-required': string
  'bearer-only': boolean
  'confidential-port': number
  'cookie-key'?: string

  // keycloak module config
  roles?: RolesOption
  rolesRequired?: boolean
  scopes?: ScopesOption
  scopesRequired?: boolean
  scopesUnauthorized?: string[]
  exceptionMessages?: ExceptionMessagesOption
}

export type RolesOption = Record<string, string>

export type ScopesOption = Record<string, string>

export interface ExceptionMessagesOption extends Record<string, string> {
  default?: string
  tokenMissing?: string
  rolesMissing?: string
  rolesUnauthorized?: string
  scopesMissing?: string
  scopesUnauthorized?: string
}

export type KeycloakConnectUserInfo = Record<string, string | number | boolean | null>

export interface KeycloakConnectUser {
  id: string
  username: string
  email: string
  verified: boolean
  roles?: string[]
  jurisdiction?: { role: string, restriction: string }[]
  groups?: string[]
  scopes?: string[] // todo: maybe that's not the correct type
}

export enum ExceptionMessagesFallback {
  tokenMissing = 'Please provide a valid bearer token.',
  rolesMissing = 'You currently have no roles assigned.',
  rolesUnauthorized = 'You don\'t have right roles.',
  scopesMissing = 'You currently have no scopes assigned.',
  scopesUnauthorized = 'You don\'t have right scopes.',
  default = 'Error while authentication request.'
}
