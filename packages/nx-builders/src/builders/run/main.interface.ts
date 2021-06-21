import { JsonObject } from '@angular-devkit/core'

/**
 * Options for ts-node-dev
 */
export interface RunBuilderOptions extends JsonObject {
  /**
   * process current working directory
   *
   * this will spawn the process from the current working directory so most of the plugins will work as expected
   */
  cwd: string

  /** command */
  command: string

  /** append arguments to the command */
  args?: string

  /** run with interactive mode, will not parse through the logger */
  interactive: boolean

  /** run with node */
  node: boolean

  /** pass in node options when running as node */
  nodeOptions?: string

  /** keep alive the process if it crashes */
  watch: boolean

  /** environment variables */
  environment?: Record<string, string>
}
