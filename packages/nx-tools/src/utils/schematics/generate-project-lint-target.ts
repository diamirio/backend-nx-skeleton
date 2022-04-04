import { normalize } from '@angular-devkit/core'
import { generateProjectLint, Linter } from '@nrwl/workspace/src/utils/lint'
import { join } from 'path'

import type { AvailableLinterTypes } from '@constants'

export function generateProjectLintTarget (options: { root: string, linter?: AvailableLinterTypes }): ReturnType<typeof generateProjectLint> {
  return generateProjectLint(normalize(options.root), join(normalize(options.root), 'tsconfig.json'), (options.linter as unknown as Linter) ?? Linter.EsLint, [
    `${options.root}/**/*.ts`,
    `${options.root}/**/*.js`
  ])
}
