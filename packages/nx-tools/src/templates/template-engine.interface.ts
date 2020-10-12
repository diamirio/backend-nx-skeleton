import { ConfigureOptions } from 'nunjucks'

export interface JinjaTemplateOptions {
  templates: string[]
  nunjucks?: ConfigureOptions
}

export interface MultipleJinjaTemplateOptions<T extends Record<string, any> = Record<string, any>> {
  templates: MultipleJinjaTemplateTemplates<T>[]
  nunjucks?: ConfigureOptions
}

export interface MultipleJinjaTemplateTemplates<T extends Record<string, any> = Record<string, any>> {
  root?: string
  path: string | RegExp
  output: string
  factory: (ctx?: T, output?: string) => T
}
