import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { NodeJsSyncHost } from '@angular-devkit/core/node'
import { getWorkspace, logProject, removePathRoot } from '@webundsoehne/nx-tools'
import { spawn, SpawnOptions, ChildProcess } from 'child_process'
import { from, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { ServeBuilderSchema } from './schema'

function startTypescriptNode (options: ServeBuilderSchema, context: BuilderContext, root: string, callback): ChildProcess {
  const { entry, tsConfig, debounce, interval, debug, cwd } = options

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
      ...process.env
    }
  }

  if (cwd) {
    spawnOptions.cwd = cwd
  }

  const tsNodeDev = spawn('ts-node-dev', args, spawnOptions)

  tsNodeDev.stdout.on('data', (data) => {
    logProject('info', context, data)
  })

  tsNodeDev.stderr.on('data', (data) => {
    logProject('error', context, data)
  })

  tsNodeDev.on('exit', (code, signal) => {
    context.logger.info(`ts-node-dev process ended with code ${code} ${signal ? `and signal ${signal}` : 'no signal'}`)
    callback()
  })

  tsNodeDev.on('error', (error) => {
    callback(error)
  })

  return tsNodeDev
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
          const tsNodeDevProcess = startTypescriptNode(options, context, root, (error) => {
            if (error) {
              observer.error(error)
            } else {
              observer.complete()
            }
          })

          if (tsNodeDevProcess.pid == null) {
            observer.next({ success: false })
          } else {
            observer.next({ success: true })
          }

          return (): void => {
            tsNodeDevProcess.kill()
          }
        })
      })
    )
}

export default createBuilder(runBuilder)
