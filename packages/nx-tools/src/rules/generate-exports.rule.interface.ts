import * as micromatch from 'micromatch'
import { ConfigureOptions } from 'nunjucks'

/**
 * Generates exports from matching patterns in to a output file like index.ts
 */
export interface GenerateExportsJinjaTemplateOptions {
  /** It will move the template to given root after it is generated. */
  root: string
  templates: {
    /** The pwd from where exports will be relatively generated. This is mostly required because the nx way is to move this file after the processing is finished. */
    cwd: string
    /** Match patterns in gitignore format. */
    pattern: string | string[]
    /** Where to output this template to */
    output: string
    options?: micromatch.Options
  }[]
  nunjucks?: ConfigureOptions
}
