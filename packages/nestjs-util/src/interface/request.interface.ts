import type { Request as ExpressRequest } from 'express'
import type { FastifyRequest } from 'fastify'

type BaseRequest = FastifyRequest | ExpressRequest

interface RequestExtensions {
  state: Record<string, any> & { setCacheLifetime?: (lifetime: number, useExpiresHeader: boolean) => void, tokenPayload?: Record<string, any> }
}

export type Request = BaseRequest & RequestExtensions
