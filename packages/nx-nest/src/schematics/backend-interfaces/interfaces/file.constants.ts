import { SchematicFiles } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'
import { AvailableDBAdapters } from '@interfaces/available.constants'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: NormalizedSchema): SchematicFiles {
  return {
    [AvailableDBAdapters.MONGOOSE]: {
      condition: options.dbAdapters.includes(AvailableDBAdapters.MONGOOSE),
      folders: [ 'entity-mongoose/' ]
    },

    [AvailableDBAdapters.TYPEORM]: {
      condition: options.dbAdapters.includes(AvailableDBAdapters.TYPEORM),
      folders: [ 'entity-typeorm/' ]
    },

    ENTITY_ROOT: {
      condition: options.dbAdapters.length > 0,
      files: [ 'entity.ts.j2' ],
      folders: [ 'database' ]
    }
  }
}
