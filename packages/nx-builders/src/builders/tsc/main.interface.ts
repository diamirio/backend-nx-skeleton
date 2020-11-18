import { JsonObject } from '@angular-devkit/core'
import { FileInputOutput, AvailableAssetGlob } from '@webundsoehne/nx-tools'
/**
 * TSC Builder options
 */
export interface TscBuilderOptions extends JsonObject {
  /**
   * process current working directory
   *
   * this will spawn the process from the current working directory so most of the plugins will work as expected
   */
  cwd: string

  /** entrypoint for the application which ts-node will run */
  main: string

  /**
   * tsconfig file that is used
   * will default to tsconfig.build.json
   */
  tsConfig: string

  /** dist folder for generated common.js files */
  outputPath: string

  /**
   * swap paths after the tsc finished
   * defaults to true
   */
  swapPaths?: boolean

  /**
   * enable watch functionality with tsc-watch
   * runAfterWatch has to be defined
   */
  watch?: boolean

  /** command to run after complition when in watch mode */
  runAfterWatch?: string

  /** export sourcemaps */
  sourceMap?: boolean

  /**
   * copy assets
   * @param asset when a string defined it has to be inside the application directory, if it is outside a glob should be defined
   */
  assets?: AvailableAssetGlob

  /**
   * package.json name to process
   * defaults to package.json
   */
  packageJson?: string

  updateBuildableProjectDepsInPackageJson?: boolean
}

export interface NormalizedBuilderOptions extends TscBuilderOptions {
  files: FileInputOutput[]
  normalizedOutputPath: string
  relativeMainFileOutput: string
}

export type ProcessPaths = Partial<Record<'typescript' | 'tscpaths' | 'tscWatch' | 'tsconfig' | 'tsconfigPaths', string>>
