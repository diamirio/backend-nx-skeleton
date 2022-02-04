import type { FastifyRequest } from 'fastify'

export interface Request extends FastifyRequest {
  state: Record<string, any> & { setCacheLifetime?: (lifetime: number, useExpiresHeader: boolean) => void, tokenPayload?: Record<string, any> }
}
