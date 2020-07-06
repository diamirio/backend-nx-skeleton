import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { NodeJsSyncHost } from '@angular-devkit/core/node'
import { getWorkspace, logProject, removePathRoot } from '@webundsoehne/nx-tools'
import { SpawnOptions, ChildProcess } from 'child_process'
import execa from 'execa'
import { from, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { ServeBuilderSchema } from './main.interface'

function startTypescriptNode (options: ServeBuilderSchema, context: BuilderContext, root: string, callback): ChildProcess {
  const { entry, tsConfig, debounce, interval, debug, cwd, environment } = options

  const args = [
    '-r',
    'tsconfig-paths/register'
  ]

  if (tsConfig) {
    args.push('--project')
    args.push(cwd ? removePathRoot(tsConfig, cwd) : tsConfig )
  }

  if (debounce) {
    args.push('--debounce')
    args.push(`${debounce}`)
  }

  if (interval) {
    args.push('--interval')
    args.push(`${interval}`)
  }

  if (debug) {
    args.push('--debug')
  }

  if (!entry) {
    throw new Error('No entry point set')
  }

  args.push(cwd ? removePathRoot(entry, cwd) : entry)

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

  logProject('info', context, `Spawning: ts-node-dev ${args.join(' ')}`)

  const instance = execa('ts-node-dev', args, spawnOptions)

  instance.stdout.on('data', (data) => {
    logProject('info', context, data)
  })

  instance.stderr.on('data', (data) => {
    logProject('error', context, data)
  })

  instance.on('exit', (code, signal) => {
    logProject('warn', context, `Process ended with code ${code} ${signal ? `and signal ${signal}` : 'no signal'}`)
    callback()
  })

  instance.on('error', (error) => {
    callback(error)
  })

  return instance
}

export function runBuilder (
  options: ServeBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const host = new NodeJsSyncHost()

  return from(getWorkspace(context, host))
    .pipe(
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
