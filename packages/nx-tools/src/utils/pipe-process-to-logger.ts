import { BuilderContext } from '@angular-devkit/architect'
import { ExecaChildProcess } from 'execa'

import { Logger } from './logger'
import { PipeProcessToLoggerOptions } from './pipe-process-to-logger.interface'

export function pipeProcessToLogger (context: BuilderContext, instance: ExecaChildProcess, options?: PipeProcessToLoggerOptions): ExecaChildProcess {
  const logger = new Logger(context)

  // default options
  options = { ...{ exitCode: true, start: false }, ...options }

  if (options.start) {
    logger.info(`Spawning process: ${instance.spawnargs.join(' ')}`)
  }

  if (instance.stdout && instance. stderr) {
    instance.stdout.on('data', (data) => {
      logger.info(data)
    })

    instance.stderr.on('data', (data) => {
      logger.warn(data)
    })
  } else {
    instance.on('message', (msg) => logger.info(String(msg)))
  }

  if (options.exitCode) {
    instance.on('exit', (code, signal) => {
      const exitMessage = `Process ended with code ${code}${signal ? ` and signal ${signal}` : ''}.`

      if (code > 0) {
        logger.fatal(exitMessage)
      } else {
        logger.info(exitMessage)
      }

      // callback for compatability reasons with observable
      if (options?.callback) {
        options.callback()
      }
    })
  }

  instance.on('error', (error) => {
    logger.fatal(error.message)

    // callback for compatability reasons with observable
    if (options?.callback) {
      options.callback()
    }
  })

  return instance
}
