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

  /** the cli name */
  cli: string

  /** pass in arguments after cli */
  arguments: string

  /** environment variables */
  environment?: Record<string, string>
}
