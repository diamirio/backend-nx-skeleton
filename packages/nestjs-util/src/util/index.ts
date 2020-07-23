import { Logger } from '@nestjs/common'
import * as fs from 'fs-extra'

export async function setEnvironmentVariables (packageFile = 'package.json'): Promise<void> {
  const { name, version } = await fs.readJSON(packageFile)

  process.env.PACKAGE_NAME = name
  process.env.PACKAGE_VERSION = version

  process.title = `${name}-${version}`
}

export function registerExitListeners (moduleName = 'module'): void {
  const logger = new Logger('ExitListener')
  function getListener (sig) {
    return (): never => {
      logger.verbose(`---- ${moduleName} exiting via ${sig} ----`)
      process.exit()
    }
  }
  process.on('SIGTERM', getListener('SIGTERM'))
  process.on('SIGINT', getListener('SIGINT'))

  process.on('exit', (code) => {
    logger.log(`++++ ${moduleName} exiting with code ${code} ++++`)
  })

  logger.debug('Exit listeners registered.')
}

export function getDuration (start: number, finish: number): number {
  // Since it is possible to do calculations with dates this weird type conversion is needed
  return ((finish || ((new Date() as any) as number)) - start) / 1000
}

export function requireNodeEnv (errorMessage = 'NODE_ENV environment variable is not set.'): void {
  if (!process.env.NODE_ENV) {
    throw new Error(errorMessage)
  }
}
