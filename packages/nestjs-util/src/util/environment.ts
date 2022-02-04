import fs from 'fs-extra'

export async function setEnvironmentVariables (packageFile = 'package.json'): Promise<void> {
  const { name, version } = await fs.readJSON(packageFile)

  process.env.PACKAGE_NAME = name
  process.env.PACKAGE_VERSION = version

  process.title = `${name}-${version}`
}

export function requireNodeEnv (errorMessage = 'NODE_ENV environment variable is not set.'): void {
  if (!process.env.NODE_ENV) {
    throw new Error(errorMessage)
  }
}
