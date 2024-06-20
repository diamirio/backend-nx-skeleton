import type { SpawnOptions } from 'node:child_process'
import { spawn } from 'node:child_process'
import { EOL } from 'node:os'

export function spawnProcess (command: string, args: string[], options: SpawnOptions): Promise<number | Error> {
  return new Promise((resolve, reject) => {
    const executor = spawn(command, args, options)

    process.stdout.write(`Spawning process: ${executor.spawnargs.join(' ')}${EOL}`)

    executor.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })
    executor.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })

    executor.on('exit', (code, signal) => {
      process.stdout.write(`Process exited with code ${code}${signal ? `- SIGNAL ${signal}` : ''}`)
      resolve(code)
    })

    executor.on('error', (error) => {
      process.stdout.write(`Process error: ${error}${EOL}`)
      reject(error)
    })
  })
}
