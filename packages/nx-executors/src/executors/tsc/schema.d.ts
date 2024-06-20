export interface TscExecutorSchema {
  cwd?: string
  main: string
  tsConfig: string
  outputPath?: string
  watch?: boolean
  rootDir?: string
  assets?: {
    glob: string
    input: string
    ignore: string
    output: string
  }[]
  clean?: boolean
  updateBuildableProjectDepsInPackageJson?: boolean
  generateLockfile?: boolean
}
