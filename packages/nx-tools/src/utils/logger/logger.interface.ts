import { LoggerApi } from '@angular-devkit/core/src/logger'

export type LogLevels = keyof Omit<LoggerApi, 'createChild' | 'log'>

export interface LoggerOptions {
  useIcons?: boolean
}
