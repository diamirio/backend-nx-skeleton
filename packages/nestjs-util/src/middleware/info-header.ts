import type { NestMiddleware } from '@nestjs/common'

import type { Request } from '@interface'

export class SetApiInfoHeaderMiddleware implements NestMiddleware {
  use (_req: Request, res: any, next: () => any): void {
    res.setHeader('X-Api-Name', process.env?.PACKAGE_NAME)
    res.setHeader('X-Api-Version', process.env?.PACKAGE_VERSION ?? process.env?.npm_package_version ?? '0.0.0')

    next()
  }
}
