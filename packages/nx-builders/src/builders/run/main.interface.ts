import type { EnvironmentVariables, ExecaArguments } from '@webundsoehne/nx-tools'

/**
 * Options for run builder
 */
export interface RunBuilderOptions {
  /**
   * process current working directory
   *
   * this will spawn the process from the current working directory so most of the plugins will work as expected
   */
  cwd: string

  /** command */
  command: string

  /** append arguments to the command */
  args?: string | string[]

  /** run with interactive mode, will not parse through the logger */
  interactive?: boolean

  /** run with node */
  node?: boolean

  /** strictly execute this with node eventhough it can be a node binary as well */
  executeWithNode?: boolean

  /** pass in node options when running as node */
  nodeOptions?: string

  /** keep alive the process if it crashes */
  watch?: boolean

  /** environment variables */
  environment?: EnvironmentVariables
}

export type NormalizedRunBuilderOptions = ExecaArguments
