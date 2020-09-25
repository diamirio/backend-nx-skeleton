import { ConfigureOptions } from 'nunjucks'

export interface JinjaTemplateOptions {
  templates: string[]
  nunjucks?: ConfigureOptions
}

export interface GenerateMultipleJinjaTemplateOptions<T> {
  templates: { path: string, output: string, factory: (ctx: T) => { path: string, content: string } }[]
  nunjucks?: ConfigureOptions
}
