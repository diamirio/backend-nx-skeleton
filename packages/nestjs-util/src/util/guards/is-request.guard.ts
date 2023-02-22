import type { Request as ExpressRequest } from 'express'
import type { FastifyRequest } from 'fastify'

export function isFastifyRequest (response: unknown): response is FastifyRequest {
  if (typeof response === 'object' && response.hasOwnProperty('raw')) {
    return true
  }

  return false
}

export function isExpressRequest (response: unknown): response is ExpressRequest {
  if (typeof response === 'object' && !response.hasOwnProperty('raw')) {
    return true
  }

  return false
}
