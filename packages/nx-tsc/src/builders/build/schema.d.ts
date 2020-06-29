import { JsonObject } from '@angular-devkit/core'

export interface NodePackageBuilderOptions extends JsonObject {
  main: string
  tsConfig: string
  outputPath: string
  watch: boolean
  sourceMap: boolean
  assets: (AssetGlob | string)[]
  packageJson: string
  updateBuildableProjectDepsInPackageJson?: boolean
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
  ignore: string[]
}