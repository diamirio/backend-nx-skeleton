import { NestMiddleware } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export class SetApiInfoHeaderMiddleware implements NestMiddleware {
  public use (req: FastifyRequest, res: any, next: () => any): void {
    res.setHeader('X-Api-Name', process.env.PACKAGE_NAME)
    res.setHeader('X-Api-Version', process.env.PACKAGE_VERSION)

    next()
  }
}
