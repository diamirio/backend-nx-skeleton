import { ListrTaskWrapper } from 'listr2'
import { DefaultRenderer } from 'listr2/dist/renderer/default.renderer'

import { GenerateExportsJinjaTemplateOptions } from '@src/rules'
import { GeneratedNameCases } from '@utils'

/**
 * This is the unparsed schema coming from the angular-schematics
 */
export interface Schema<T = string> {
  /** given name of the component */
  name: string

  /** type of the component that is available in files */
  type: T | string

  /** directory of the generated component, defaults to process.cwd() */
  directory?: string

  /** enable or disable exporting from a file with a given pattern */
  exports?: GenerateExportsJinjaTemplateOptions['templates']

  skipFormat?: boolean

  force?: boolean

  silent?: boolean
}

/**
 * This is the parsed schema through normalize options.
 */
export interface NormalizedSchema<T = any, K = string> extends Schema<K> {
  root: string
  packageScope: string
  casing: GeneratedNameCases
  inject?: T
}

export type GeneratorInjectExtension<T = any, K = string, P = any> = (task: ListrTaskWrapper<NormalizedSchema<K, P>, typeof DefaultRenderer>) => T | Promise<T>
