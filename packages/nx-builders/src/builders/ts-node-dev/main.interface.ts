import { JsonObject } from '@angular-devkit/core'

export interface NodePackageServeOptions extends JsonObject {
  /** process CWD */
  cwd: string

  /** Path to entry point */
  main: string

  /** Path to tsconfig.json */
  tsConfig?: string

  /** Additional debug output */
  debug?: boolean

  /** Debounce in ms */
  debounce?: number

  /** Interval in ms */
  interval?: number

  environment?: Record<string, string>
}
