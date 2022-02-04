export type AvailableAssetGlob = (AssetGlob | string)[]

export interface FileInputOutput {
  input: string
  output: string
}

export type AssetGlob = FileInputOutput & {
  glob: string
  ignore?: string[]
}
