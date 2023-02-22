import type { Response as ExpressResponse } from 'express'
import type { FastifyReply } from 'fastify'

export type Response = FastifyReply | ExpressResponse
