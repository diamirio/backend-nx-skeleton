import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { ExecaArguments, pipeProcessToLogger, removePathRoot } from '@webundsoehne/nx-tools'
import { SpawnOptions } from 'child_process'
import execa from 'execa'
import { Observable, Subscriber } from 'rxjs'

import { NodePackageServeOptions } from './main.interface'

try {
  require('dotenv').config()
  // eslint-disable-next-line no-empty
} catch (e) {}

export function runBuilder (options: NodePackageServeOptions, context: BuilderContext): Observable<BuilderOutput> {
  return Observable.create(
    async (subscriber: Subscriber<BuilderOutput>): Promise<void> => {
      const { args, spawnOptions } = normalizeArguments(options)

      try {
        await pipeProcessToLogger(context, execa('ts-node-dev', args, spawnOptions), { start: true })

        subscriber.next({ success: true })
      } catch (error) {
        subscriber.error(new Error(`Could not compile Typescript files:\n${error}`))
      } finally {
        subscriber.complete()
      }
    }
  )
}

function normalizeArguments (options: NodePackageServeOptions): ExecaArguments {
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
    throw new Error('No entry point set.')
  }

  // run path
  args = [ ...args, cwd ? removePathRoot(main, cwd) : main ]

  const spawnOptions: SpawnOptions = {
    env: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
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

export default createBuilder(runBuilder)
