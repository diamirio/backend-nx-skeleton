export interface PipeProcessToLoggerOptions {
  /** Will log the command when the process starts. */
  start?: boolean
  /** Will log the exit code when process finishes. */
  exitCode?: boolean
  /** enable/disable stdout */
  stdout?: boolean
  /** enable/disable stderrr */
  stderr?: boolean
  /** will callback on error in the instance */
  callback?: (error?: Error) => void
}
