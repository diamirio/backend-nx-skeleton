import { NormalizedSchema as WorkspaceNormalizedSchema } from '../schematics/workspace/main.interface'
import { AvailableFolderStructures } from './available.constants'
import { SchematicFiles } from '@webundsoehne/nx-tools'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: WorkspaceNormalizedSchema): SchematicFiles {
  return {
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
