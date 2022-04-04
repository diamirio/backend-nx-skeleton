import type { NormalizedSchema } from '../main.interface'
import { AvailableDBAdapters } from '@interfaces/available.constants'
import type { SchematicFiles } from '@webundsoehne/nx-tools'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: NormalizedSchema): SchematicFiles {
  return {
    [AvailableDBAdapters.MONGOOSE]: {
      condition: options.dbAdapters.includes(AvailableDBAdapters.MONGOOSE),
      folders: [SchematicFilesMap[AvailableDBAdapters.MONGOOSE]]
    },

    [AvailableDBAdapters.TYPEORM]: {
      condition: options.dbAdapters.includes(AvailableDBAdapters.TYPEORM),
      folders: [SchematicFilesMap[AvailableDBAdapters.TYPEORM]]
    },

    ENTITY_ROOT: {
      condition: options.dbAdapters.length > 0,
      files: ['entity.ts.j2'],
      folders: ['database']
    }
  }
}

export const SchematicFilesMap: Record<AvailableDBAdapters, string> = {
  [AvailableDBAdapters.MONGOOSE]: 'entity-mongoose',
  [AvailableDBAdapters.TYPEORM]: 'entity-typeorm'
}
