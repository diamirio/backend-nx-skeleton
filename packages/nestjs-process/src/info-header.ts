import type { NestMiddleware, OnModuleInit } from '@nestjs/common'

import { setEnvironmentVariables } from './environment'

export class SetApiInfoHeaderMiddleware implements NestMiddleware, OnModuleInit {
  async onModuleInit(): Promise<void> {
    await setEnvironmentVariables()
  }

  use(_req: never, res: any, next: () => unknown): void {
    res.setHeader('X-Api-Name', process.env?.PACKAGE_NAME)
    res.setHeader('X-Api-Version', process.env?.PACKAGE_VERSION ?? process.env?.npm_package_version ?? '0.0.0')

    next()
  }
}
