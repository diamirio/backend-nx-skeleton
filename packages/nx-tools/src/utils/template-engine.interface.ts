import { ConfigureOptions } from 'nunjucks'

export interface JinjaTemplateOptions {
  templates: string[]
  nunjucks?: ConfigureOptions
}

export interface MultipleJinjaTemplateOptions<T extends Record<string, any> = Record<string, any>> {
  templates: { path: string, output: string, factory: (ctx: T, output: string) => T }[]
  nunjucks?: ConfigureOptions
}
