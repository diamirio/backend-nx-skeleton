import { InternalServerErrorException } from '@nestjs/common'

import { service } from './constants'
import { createApplication as createCommandApplication } from './command/init'
import { createApplication as createServerApplication } from './server/init'
import { createApplication as createTaskApplication } from './task/init'

function bootstrap (): Promise<void> {
  switch (String(process.env.NODE_SERVICE).toLowerCase()) {
    case service.server:
      return createServerApplication()
    case service.task:
      return createTaskApplication()
    case service.command:
      return createCommandApplication()
    default:
      throw new InternalServerErrorException('NODE_SERVICE environment variable is not set.')
  }
}

bootstrap()
