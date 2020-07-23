import { FastifyRequest } from 'fastify'

export interface AnyObject {
  [prop: string]: any
}

interface State {
  [prop: string]: any
  setCacheLifetime?: (lifetime: number, useExpiresHeader: boolean) => void
  tokenPayload?: AnyObject
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
