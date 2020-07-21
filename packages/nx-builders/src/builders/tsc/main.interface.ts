import { JsonObject } from '@angular-devkit/core'

export interface NodePackageBuilderOptions extends JsonObject {
  cwd: string

  main: string

  tsConfig: string

  outputPath: string

  swapPaths?: boolean

  watch?: boolean

  sourceMap?: boolean

  assets?: (AssetGlob | string)[]

  packageJson?: string

  updateBuildableProjectDepsInPackageJson?: boolean

  verbose?: boolean
}

export interface NormalizedBuilderOptions extends NodePackageBuilderOptions {
  files: FileInputOutput[]
  normalizedOutputPath: string
  relativeMainFileOutput: string
}

export type FileInputOutput = {
  input: string
  output: string
}

export type AssetGlob = FileInputOutput & {
  glob: string
  ignore?: string[]
}
