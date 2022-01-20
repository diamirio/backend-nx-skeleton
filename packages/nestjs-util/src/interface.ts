import type { FastifyRequest } from 'fastify'

interface State {
  [prop: string]: any
  setCacheLifetime?: (lifetime: number, useExpiresHeader: boolean) => void
  tokenPayload?: Record<string, any>
}

export interface Request extends FastifyRequest {
  state: State
}

export interface CacheLifetimeOptions {
  defaultExpiresHeader?: boolean
  defaultLifetime?: number
  expiresHeader?: string
  cacheControlHeader?: string
}
