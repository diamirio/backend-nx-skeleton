import colors from 'cli-color'

export enum LogType {
  error = 'error',
  log = 'info',
  info = 'info',
  warn = 'warn',
  debug = 'debug',
  verbose = 'verbose',
  none = 'none'
}

export const LOG_LEVEL: string = LogType.verbose

export const ColorSchema = {
  [LogType.log]: colors.greenBright,
  [LogType.error]: colors.red,
  [LogType.warn]: colors.yellow,
  [LogType.debug]: colors.magentaBright,
  [LogType.verbose]: colors.cyanBright
}
