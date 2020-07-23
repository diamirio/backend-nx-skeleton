export enum LogType {
  error = 'error',
  log = 'info',
  warn = 'warn',
  debug = 'debug',
  verbose = 'verbose'
}

export const logLevel: string = LogType.verbose
