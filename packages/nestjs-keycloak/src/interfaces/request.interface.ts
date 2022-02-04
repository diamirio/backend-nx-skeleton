import type { Request } from 'express'
import type { FastifyRequest } from 'fastify'

import type { KeycloakConnectUser } from '@connect/connect.interfaces'

interface RequestWithAuthentication {
  user?: KeycloakConnectUser
  accessToken?: string
}

export type EnrichedExpressRequest = RequestWithAuthentication & Request
export type EnrichedFastifyRequest = RequestWithAuthentication & FastifyRequest

export type EnrichedRequest = EnrichedExpressRequest | EnrichedFastifyRequest
