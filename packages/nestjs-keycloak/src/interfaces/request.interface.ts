import type { Request } from 'express'
import type { FastifyRequest } from 'fastify'

import type { KeycloakConnectUser } from '@connect/connect.interfaces'

interface RequestWithAuthentication<User = KeycloakConnectUser> {
  user?: User
  accessToken?: string
}

export type EnrichedExpressRequest<User = KeycloakConnectUser> = RequestWithAuthentication<User> & Request
export type EnrichedFastifyRequest<User = KeycloakConnectUser> = RequestWithAuthentication<User> & FastifyRequest

export type EnrichedRequest<User = KeycloakConnectUser> = EnrichedExpressRequest<User> | EnrichedFastifyRequest<User>
