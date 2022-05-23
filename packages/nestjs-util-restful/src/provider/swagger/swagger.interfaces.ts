import type { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export interface SwaggerConfig {
  useHttps: boolean
  basePath: string
  path: string
  title: string
  description: string
  custom?: SwaggerCustomOptions
}

export interface UrlConfig {
  basePath: string
  apiPath: string
}

export interface SwaggerOptions {
  customize: (builder: DocumentBuilder) => DocumentBuilder
}
