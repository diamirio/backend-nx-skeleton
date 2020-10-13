import { SchematicFiles } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '../main.interface'
/* eslint-disable @typescript-eslint/naming-convention */
import { AvailableComponents } from '@src/interfaces'
import { AvailableTestsTypes } from '@src/interfaces/index'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export function getSchematicFiles (options: NormalizedSchema): SchematicFiles {
  return {
    [AvailableTestsTypes.JEST]: {
      condition: options.tests === AvailableTestsTypes.JEST,
      files: [ '.spec.ts', 'e2e.spec.ts' ],
      folders: [ 'tests/' ]
    },
    [AvailableComponents.SERVER]: {
      condition: options.components.includes(AvailableComponents.SERVER),
      folders: [ `${options.sourceRoot}/server/` ]
    },
    [AvailableComponents.BG_TASK]: {
      condition: options.components.includes(AvailableComponents.BG_TASK),
      folders: [ `${options.sourceRoot}/task/` ]
    },
    [AvailableComponents.COMMAND]: {
      condition: options.components.includes(AvailableComponents.COMMAND),
      folders: [ `${options.sourceRoot}/command/` ]
    },
    [AvailableComponents.MICROSERVICE_SERVER]: {
      condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
      folders: [ `${options.sourceRoot}/microservice-server/` ]
    },
    CONSTANTS: {
      condition: options.components.length > 1,
      files: [ `${options.sourceRoot}/constants.ts` ]
    }
  }
}
