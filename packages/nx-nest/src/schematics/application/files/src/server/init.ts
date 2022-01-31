import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'

import { createServerModule } from './server.module'
import { LoggerService, SwaggerService, ConfigService } from '@webundsoehne/nestjs-util'

export async function createApplication(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(createServerModule(), new FastifyAdapter(), {
    logger: new LoggerService()
  })

  const port: number = ConfigService.get('port') ?? 3000
  const prefix: string = ConfigService.get('url.apiPath') ?? ''

  // app.enableCors()

  app.setGlobalPrefix(prefix)

  SwaggerService.enable(app)

  await app.listen(port, '0.0.0.0')
}
