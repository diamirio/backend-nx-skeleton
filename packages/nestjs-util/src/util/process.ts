import { Logger } from '@nestjs/common'

export function registerExitListeners (name = 'module'): void {
  const logger = new Logger('ExitListener')

  function getListener (sig: string) {
    return (): never => {
      logger.verbose(['---- %s exiting via %s ----', name, sig])
      process.exit()
    }
  }
  process.on('SIGTERM', getListener('SIGTERM'))
  process.on('SIGINT', getListener('SIGINT'))

  process.on('exit', (code) => {
    logger.log(['++++ %s exiting with code %s ++++', name, code])
  })

  logger.debug('Exit listeners registered.')
}
