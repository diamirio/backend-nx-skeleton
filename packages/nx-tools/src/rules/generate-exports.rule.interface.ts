import * as micromatch from 'micromatch'
import { ConfigureOptions } from 'nunjucks'

export interface GenerateExportsJinjaTemplateOptions {
  /** It will move the template to given root after it is generated. */
  root: string
  templates: {
    /** The pwd from where exports will be relatively generated. */
    cwd: string
    /** Match patterns in gitignore format. */
    pattern: string | string[]
    /** Where to output this template to */
    output: string
    options?: micromatch.Options
  }[]
  nunjucks?: ConfigureOptions
}
