import fs from 'fs-extra'
import path from 'path'

export async function setEnvironmentVariables (packageFile = path.join(process.cwd(), 'package.json')): Promise<void> {
  // this should cover many cases and different package managers with various fallbacks
  const name = process.env.PACKAGE_NAME ?? process.env.npm_package_name ?? path.basename(process.env.PWD ?? '').length ? path.basename(process.env.PWD) : undefined
  const version = process.env.PACKAGE_VERSION ?? process.env.npm_package_version

  let packageJson

  // only read package file if we miss something
  if (!name || !version) {
    packageJson = await fs.readJSON(packageFile)
  }

  process.env.PACKAGE_NAME = name ?? packageJson?.name ?? 'nestjs'
  process.env.PACKAGE_VERSION = version ?? packageJson?.version ?? '0.0.0'

  process.title = `${process.env.PACKAGE_NAME}-${process.env.PACKAGE_VERSION}`
}

export function requireNodeEnv (errorMessage = 'NODE_ENV environment variable is not set.'): void {
  if (!process.env.NODE_ENV) {
    throw new Error(errorMessage)
  }
}
