import type { ConfigureOptions } from 'nunjucks'

/**
 * Generate templates ending with extension as jinja templates.
 */
export interface JinjaTemplateOptions {
  /** Set of extensions to designate as jinja tempaltes */
  templates: string[]
  nunjucks?: ConfigureOptions
}

/**
 * Generate multiple outputs from single jinja template with dynamic context.
 */
export interface MultipleJinjaTemplateOptions<T extends Record<string, any> = Record<string, any>> {
  templates: MultipleJinjaTemplateTemplates<T>[]
  nunjucks?: ConfigureOptions
}

/**
 * Options for multiple jinja templates.
 */
export interface MultipleJinjaTemplateTemplates<T extends Record<string, any> = Record<string, any>> {
  /** To move the file in to a given root directory after operations finished. */
  root?: string
  /** Path of the template that will be used. */
  path: string | RegExp
  /** Output path for generating multiple templates. */
  output: string
  /** Since everytemplate is individual, the template context can be generated through given ctx and output path. */
  factory: (ctx?: T, output?: string) => T
  /** These templates can be one time templates, the option to overwrite can be set to false to skip rewriting existing template. */
  overwrite?: boolean
}
