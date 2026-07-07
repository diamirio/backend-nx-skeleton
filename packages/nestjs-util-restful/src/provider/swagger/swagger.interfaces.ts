import type { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export interface SwaggerConfig {
  enabled: boolean
  title?: string
  description?: string
  path?: string
  custom?: SwaggerCustomOptions
}

export interface UrlConfig {
  apiPath?: string
}

export interface SwaggerOptions {
  customize: (builder: DocumentBuilder) => DocumentBuilder
}
