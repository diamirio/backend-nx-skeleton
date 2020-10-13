/* eslint-disable @typescript-eslint/naming-convention */
import { AvailableComponents } from '@src/interfaces'
import { AvailableTestsTypes } from '@src/interfaces/index'

/**
 * This constant includes the files that are required for different components.
 * It can be used to filter out files, if that component is not used.
 */
export const SchematicFiles: Record<string, string[]> = {
  [AvailableTestsTypes.JEST]: [ '.spec.ts', 'tests/' ],
  [AvailableComponents.SERVER]: [ 'src/server/' ],
  [AvailableComponents.BG_TASK]: [ 'src/task/' ],
  [AvailableComponents.COMMAND]: [ 'src/command/' ],
  [AvailableComponents.MICROSERVICE_SERVER]: [ 'src/microservice-server/' ],
  CONSTANTS: [ 'src/constants.ts' ]
}
