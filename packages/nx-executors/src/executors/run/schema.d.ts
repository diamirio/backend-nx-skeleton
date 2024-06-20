export interface RunExecutorSchema {
  cwd?: string
  command: string
  args?: string[]
  env?: Record<string, string>
  environment?: Record<string, string>
}
