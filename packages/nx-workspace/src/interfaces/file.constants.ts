import { SchematicFiles } from '@webundsoehne/nx-tools'

import { NormalizedSchema as WorkspaceNormalizedSchema } from '../schematics/workspace/main.interface'
import { AvailableCLIs, AvailableFolderStructures } from './available.constants'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: WorkspaceNormalizedSchema): SchematicFiles {
  return {
    [AvailableCLIs.ANGULAR]: {
      condition: options.cli === AvailableCLIs.ANGULAR,
      files: [ 'decorate-angular-cli.js' ]
    },
    [AvailableFolderStructures.MULTIPLE]: {
      condition: options.layout === AvailableFolderStructures.MULTIPLE,
      folders: [ 'apps', 'libs' ]
    },
    [AvailableFolderStructures.SINGLE]: {
      condition: options.layout === AvailableFolderStructures.SINGLE,
      folders: [ 'packages' ]
    }
  }
}
