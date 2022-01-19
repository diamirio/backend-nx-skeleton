import { AvailableCLIs, AvailableFolderStructures } from '@interfaces/available.constants'
import { PackageVersions } from '@webundsoehne/nx-tools'

/**
 * This is the unparsed options list coming from angular-schematics
 */
export interface Schema extends CommonPropertiesToSaveAndUse<true> {
  directory: string
  name: string
  skipInstall?: boolean
  skipGit?: boolean
  commit?: { name: string, email: string, message?: string }
}

/**
 * This is the parsed options after normalizing options.
 * It can not extend the default schema because types are different after parsed
 */
export interface NormalizedSchema extends Schema {
  root: string
  packageScope: string
  workspaceFile: string
  cliCmd: string
  deps: PackageVersions['deps']
  devDeps: PackageVersions['devDeps']
  eslintConfig: Record<string, unknown>
  enum: CommonPropertiesToSaveAndUse
}

interface CommonPropertiesToSaveAndUse<Values extends boolean = false> {
  cli: Values extends true ? AvailableCLIs : typeof AvailableCLIs
  layout: Values extends true ? AvailableFolderStructures : typeof AvailableFolderStructures
}
