export interface TsNodeDevExecutorSchema {
  cwd?: string
  main: string
  tsConfig: string
  env?: Record<string, string>
  environment?: Record<string, string>
  debug?: boolean
  watchConfig?: boolean
  args?: string[]
}
