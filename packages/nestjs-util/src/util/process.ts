import { Logger } from '@nestjs/common'

export function registerExitListeners (moduleName = 'module'): void {
  const logger = new Logger('ExitListener')

  function getListener (sig: string) {
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
