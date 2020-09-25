import { JsonObject } from '@angular-devkit/core'

export interface TsNodeBuilderOptions extends JsonObject {
  /** process CWD */
  cwd: string

  /** Path to entry point */
  main: string

  /** Path to tsconfig.json */
  tsConfig?: string

  /** Debounce in ms */
  debounce?: number

  /** Interval in ms */
  interval?: number

  /** Additional debug output */
  debug?: boolean

  /** Inspect port */
  inspect?: number

  /** environment variables */
  environment?: Record<string, string>
}
