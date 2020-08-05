export interface PipeProcessToLoggerOptions {
  start?: boolean
  exitCode?: boolean
  callback?: (error?: Error) => void
}