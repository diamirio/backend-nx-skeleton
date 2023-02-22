import type { Response as ExpressResponse } from 'express'
import type { FastifyReply } from 'fastify'

import type { Response } from '@interface'

export function isResponse (response: unknown): response is Response {
  if (typeof response === 'object' && !response.hasOwnProperty('send')) {
    return true
  }

  return false
}

export function isFastifyResponse (response: unknown): response is FastifyReply {
  if (typeof response === 'object' && response.hasOwnProperty('code')) {
    return true
  }

  return false
}

export function isExpressResponse (response: unknown): response is ExpressResponse {
  if (typeof response === 'object' && !response.hasOwnProperty('code')) {
    return true
  }

  return false
}
