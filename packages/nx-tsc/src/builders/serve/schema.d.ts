import { JsonObject } from '@angular-devkit/core'

export interface ServeBuilderSchema extends JsonObject {
  /** Path to entry point */
  entry: string

  /** Path to tsconfig.json */
  tsConfig?: string

  /** Additional debug output */
  debug?: boolean

  /** Debounce in ms */
  debounce?: number

  /** Interval in ms */
  interval?: number

  /** process CWD */
  cwd?: string
}
