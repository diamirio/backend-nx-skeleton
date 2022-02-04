import type { DocumentBuilder } from '@nestjs/swagger'

export interface SwaggerConfig {
  useHttps: boolean
  basePath: string
  path: string
  title: string
  description: string
}

export interface UrlConfig {
  basePath: string
  apiPath: string
}

export interface SwaggerOptions {
  customize: (builder: DocumentBuilder) => DocumentBuilder
}
