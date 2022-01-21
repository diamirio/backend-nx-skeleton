import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { SwaggerConfig, SwaggerOptions, UrlConfig } from './swagger.interfaces'
import { Configurable, ConfigParam } from '@provider/config'

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

    SwaggerModule.setup(
      `${url?.apiPath}${config.path}`,
      app,
      SwaggerModule.createDocument(app, builder.build(), {
        ignoreGlobalPrefix: false
      })
    )
  }
}
