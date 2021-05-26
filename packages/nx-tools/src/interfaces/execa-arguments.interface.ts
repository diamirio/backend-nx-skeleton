import execa from 'execa'

import { Writeable } from '@interfaces/helper-types.interface'

/**
 * Just some arguments to spawn execa.
 */
export interface ExecaArguments {
  /** These are the input arguments */
  args: string[]
  /** While these are the execa options */
  spawnOptions: Writeable<execa.Options<string>>
}
