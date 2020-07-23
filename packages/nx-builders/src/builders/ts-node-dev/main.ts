import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { NodeJsSyncHost } from '@angular-devkit/core/node'
import { getWorkspace, Logger, removePathRoot } from '@webundsoehne/nx-tools'
import { SpawnOptions, ChildProcess } from 'child_process'
import execa from 'execa'
import { from, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { NodePackageServeOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

function startTypescriptNode (options: NodePackageServeOptions, context: BuilderContext, root: string, callback): ChildProcess {
  const logger = new Logger(context)

  const { args, spawnOptions } = normalizeOptions(options)

  logger.info(`Spawning: ts-node-dev ${args.join(' ')}`)

  const instance = execa('ts-node-dev', args, spawnOptions)

  instance.stdout.on('data', (data) => {
    logger.info(data)
  })

  instance.stderr.on('data', (data) => {
    logger.warn(data)
  })

  instance.on('exit', (code, signal) => {
    logger.fatal(`Process ended with code ${code} ${signal ? `and signal ${signal}` : 'no signal'}`)
    callback()
  })

  instance.on('error', (error) => {
    callback(error)
  })

  return instance
}

function normalizeOptions (options: NodePackageServeOptions): { args: string[], spawnOptions: execa.Options } {
  const { main, tsConfig, debounce, interval, debug, cwd, environment, inspect } = options

  // default options
  let args = [ '-r', 'tsconfig-paths/register' ]

  // options
  if (tsConfig) {
    args = [ ...args, '--project', cwd ? removePathRoot(tsConfig, cwd) : tsConfig ]
  }

  if (debounce) {
    args = [ ...args, '--debounce', `${debounce}` ]
  }

  if (interval) {
    args = [ ...args, '--interval', `${interval}` ]
  }

  if (debug) {
    args = [ ...args, '--debug' ]
  }

  if (inspect) {
    args = [ ...args, `--inspect=0.0.0.0:${options.inspect}` ]
  }

  if (!main) {
    throw new Error('No entry point set')
  }

  // run path
  args = [ ...args, cwd ? removePathRoot(main, cwd) : main ]

  const spawnOptions: SpawnOptions = {
    env: {
      NODE_ENV: 'develop',
      ...environment,
      ...process.env
    }
  }

  if (cwd) {
    spawnOptions.cwd = cwd
  }

  return { args, spawnOptions }
}

export function runBuilder (options: NodePackageServeOptions, context: BuilderContext): Observable<BuilderOutput> {
  const host = new NodeJsSyncHost()

  return from(getWorkspace(context, host)).pipe(
    switchMap((workspace) => {
      const { root } = workspace.projects.get(context.target.project)

      return new Observable<BuilderOutput>((observer) => {
        const process = startTypescriptNode(options, context, root, (error) => {
          if (error) {
            observer.error(error)
          } else {
            observer.complete()
          }
        })

        if (process.pid == null) {
          observer.next({ success: false })
        } else {
          observer.next({ success: true })
        }

        return (): void => {
          process.kill()
        }
      })
    })
  )
}

export default createBuilder(runBuilder)
