import { BuilderContext } from '@angular-devkit/architect'
import { ExecaChildProcess } from 'execa'
import through from 'through'

import { Logger } from './logger'
import { PipeProcessToLoggerOptions } from './pipe-process-to-logger.interface'

/**
 * Given the instance it will pipe process output through the logger to append prefixes such as the application name.
 * @param context
 * @param instance
 * @param options
 */
export function pipeProcessToLogger (context: BuilderContext, instance: ExecaChildProcess, options?: PipeProcessToLoggerOptions): ExecaChildProcess {
  const logger = new Logger(context)

  // default options
  options = {
    exitCode: false,
    start: false,
    stderr: true,
    stdout: true,
    ...options
  }

  if (options.start) {
    logger.info(`Spawning process: ${instance.spawnargs.join(' ')}`)
  }

  if (instance.stdout) {
    instance.stdout.pipe(
      through((chunk: string) => {
        if (options.stdout) {
          logger.info(chunk)
        } else {
          logger.debug(chunk)
        }
      })
    )
  }

  if (instance.stderr) {
    instance.stderr.pipe(
      through((chunk: string) => {
        if (options.stderr) {
          logger.warn(chunk)
        } else {
          logger.debug(chunk)
        }
      })
    )
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
      options.callback(error)
    }
  })

  return instance
}
