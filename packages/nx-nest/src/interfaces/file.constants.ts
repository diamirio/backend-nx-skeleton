/* eslint-disable @typescript-eslint/naming-convention */
import { AvailableComponents } from '@src/interfaces'
import { AvailableTestsTypes } from '@src/interfaces/index'

/**
 * This constant includes the files that are required for different components.abs
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

/**
 * This enum includes keywords that is used in template to omit certain parts of application.
 * Templates are files decorataded with __KEYWORD__.
 * Or can be directly used for the other enums like available components and such.
 */
export enum SchematicMatchKeywords {
  TYPEORM_FILES = 'typeorm',
  MONGOOSE_FILES = 'mongoose'
}
