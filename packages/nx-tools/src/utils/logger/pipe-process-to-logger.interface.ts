export interface PipeProcessToLoggerOptions {
  start?: boolean
  exitCode?: boolean
  stdout?: boolean
  stderr?: boolean
  callback?: (error?: Error) => void
}
