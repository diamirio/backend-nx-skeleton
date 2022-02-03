import type { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBAdapters } from '@interfaces/available.constants'
import type { SchematicFiles } from '@webundsoehne/nx-tools'
import { AvailableTestsTypes } from '@webundsoehne/nx-tools'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: NormalizedSchema): SchematicFiles {
  return {
    [AvailableTestsTypes.JEST]: {
      condition: options.tests === AvailableTestsTypes.JEST,
      files: ['.spec.ts', 'e2e.spec.ts'],
      folders: ['test/']
    },
    [AvailableComponents.SERVER]: {
      condition: options.components.includes(AvailableComponents.SERVER),
      folders: [`${options.sourceRoot}/server/`]
    },
    [AvailableComponents.BG_TASK]: {
      condition: options.components.includes(AvailableComponents.BG_TASK),
      folders: [`${options.sourceRoot}/task/`]
    },
    [AvailableComponents.COMMAND]: {
      condition: options.components.includes(AvailableComponents.COMMAND),
      folders: [`${options.sourceRoot}/command/`]
    },
    [AvailableComponents.MICROSERVICE_SERVER]: {
      condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
      folders: [`${options.sourceRoot}/microservice/`]
    },
    CONSTANTS: {
      condition: options.effectiveComponents > 1,
      files: [`${options.sourceRoot}/constants.ts`]
    }
  }
}

export const SchematicFilesMap: Record<AvailableDBAdapters | 'UTILS', string> = {
  [AvailableDBAdapters.MONGOOSE]: 'entity',
  [AvailableDBAdapters.TYPEORM]: 'entity',
  UTILS: 'util'
}
