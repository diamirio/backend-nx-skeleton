import type { AvailableAssetGlob, FileInputOutput } from '@webundsoehne/nx-tools'

/**
 * TSC Builder options
 */
export interface TscBuilderOptions {
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

  /** command to run after completion when in watch mode */
  runAfterWatch?: string

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

  /**
   * inject environment variables to build process
   */
  environment?: Record<string, string>
}

export interface NormalizedBuilderOptions extends TscBuilderOptions {
  files: FileInputOutput[]
  normalizedOutputPath: string
  relativeMainFileOutput: string
}

export type OptionParserModes = 'typescript' | 'tsconfigReplacePaths' | 'tsc-watch' | 'runAfterWatch'

export type OptionParser<T> = { mode?: OptionParserModes[], rules?: { condition?: boolean, args: T }[] }[]

export type ProcessPaths = Record<'typescript' | 'tsconfigReplacePaths' | 'tscWatch' | 'tsconfig', string>
