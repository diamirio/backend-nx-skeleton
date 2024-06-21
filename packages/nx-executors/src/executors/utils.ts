import type { SpawnOptions } from 'node:child_process'
import { spawn } from 'node:child_process'
import { EOL } from 'node:os'
import type { ExecutorContext } from 'nx/src/config/misc-interfaces'

import { LogWriter } from './logger'

export function spawnProcess (command: string, args: string[], options: SpawnOptions, context: ExecutorContext): Promise<number | Error> {
  const logWriter = new LogWriter(context)

  return new Promise((resolve, reject) => {
    const executor = spawn(command, args, options)

    logWriter.stdout(`Spawning process: ${executor.spawnargs.join(' ')}${EOL}`)

    executor.stdout.on('data', (data) => {
      logWriter.stdout(data.toString())
    })
    executor.stderr.on('data', (data) => {
      logWriter.stderr(data.toString())
    })

    executor.on('exit', (code, signal) => {
      logWriter.stdout(`Process exited with code ${code}${signal ? `- SIGNAL ${signal}` : ''}`)
      resolve(code)
    })

    executor.on('error', (error) => {
      logWriter.stdout(`Process error: ${error}${EOL}`)
      reject(error)
    })
  })
}
