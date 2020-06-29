import { BuilderContext } from '@angular-devkit/architect'
import { LoggerApi } from '@angular-devkit/core/src/logger'
import chalk from 'chalk'
import { EOL } from 'os'

export function logProject (level: keyof Omit<LoggerApi, 'createChild' | 'log'>, context: BuilderContext, data: string | Buffer): void {
  const lines = data.toString().split(EOL)

  const project = context.target.project

  lines.forEach((line) => {
    if (line !== '') {
      context.logger.log(level, chalk.green.bold(`[${project}] `) + line)
    }
  })
}
