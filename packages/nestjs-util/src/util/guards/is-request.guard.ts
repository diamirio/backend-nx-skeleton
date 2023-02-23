import type { Request as ExpressRequest } from 'express'
import type { FastifyRequest } from 'fastify'

export function isFastifyRequest (request: unknown): request is FastifyRequest {
  if (typeof request === 'object' && request.hasOwnProperty('raw')) {
    return true
  }

  return false
}

export function isExpressRequest (request: unknown): request is ExpressRequest {
  if (typeof request === 'object' && !request.hasOwnProperty('raw')) {
    return true
  }

  return false
}
