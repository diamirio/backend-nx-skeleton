import execa from 'execa'

/**
 * Just some arguments to spawn execa.
 */
export interface ExecaArguments {
  /** These are the input arguments */
  args: string[]
  /** While these are the execa options */
  spawnOptions: execa.Options
}
