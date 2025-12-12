import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import type { SwaggerConfig, SwaggerOptions, UrlConfig } from './swagger.interfaces'

export class SwaggerService {
  /**
   * Enables a swagger route to the application
   *
   * @param {INestApplication} app
   * @param {SwaggerConfig} [config]
   * @param {UrlConfig} [url]
   * @param {SwaggerOptions} [options]
   */
  static enable(app: INestApplication, config?: SwaggerConfig, url?: UrlConfig, options?: SwaggerOptions): void {
    let builder = new DocumentBuilder()
      .setTitle(config?.title)
      .setDescription(config?.description)
      .setVersion(process.env?.PACKAGE_VERSION ?? process.env?.npm_package_version ?? '0.0.0')

    if (typeof options?.customize === 'function') {
      builder = options.customize(builder)
    }

    // FIXME: this is a bug with fastify, if we use the global prefix, it ignores it while using fastify but express works just fine
    SwaggerModule.setup(
      `${url?.apiPath ?? ''}${config.path}`,
      app,
      SwaggerModule.createDocument(app, builder.build(), {
        ignoreGlobalPrefix: false
      }),
      config?.custom
    )
  }
}
