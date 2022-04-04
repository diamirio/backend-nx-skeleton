import type execa from 'execa'

import type { Writeable } from '@webundsoehne/ts-utility-types'

/**
 * Just some arguments to spawn execa.
 */
export interface ExecaArguments {
  /** These are the input arguments */
  args: string[]
  /** While these are the execa options */
  spawnOptions: Writeable<execa.Options<string> | execa.NodeOptions<string>>
}
