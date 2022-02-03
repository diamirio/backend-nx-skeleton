import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { SwaggerConfig, SwaggerOptions, UrlConfig } from './swagger.interfaces'
import { Configurable, ConfigParam } from '@webundsoehne/nestjs-util'

export class SwaggerService {
  /**
   * Enables a swagger route to the application
   *
   * @param {INestApplication} app
   * @param {SwaggerOptions} [options]
   * @param {SwaggerConfig} [config]
   */
  @Configurable()
  static enable (app: INestApplication, options?: SwaggerOptions, @ConfigParam('swagger') config?: SwaggerConfig, @ConfigParam('url') url?: UrlConfig): void {
    let builder = new DocumentBuilder()
      .setTitle(config?.title)
      .setDescription(config?.description)
      .setVersion(process.env?.PACKAGE_VERSION ?? '0.0.0')

    if (typeof options?.customize === 'function') {
      builder = options.customize(builder)
    }

    // FIXME: this is a bug with fastify, if we use the global prefix, it ignors it while using fastify but express works just fine
    SwaggerModule.setup(
      `${url?.apiPath}${config.path}`,
      app,
      SwaggerModule.createDocument(app, builder.build(), {
        ignoreGlobalPrefix: false
      })
    )
  }
}
