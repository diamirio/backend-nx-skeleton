import { normalize } from '@angular-devkit/core'
import type { Linter } from '@nrwl/workspace/src/utils/lint'
import { generateProjectLint } from '@nrwl/workspace/src/utils/lint'
import { join } from 'path'

import { AvailableLinterTypes } from '@constants'

export function generateProjectLintTarget (options: { root: string, linter?: AvailableLinterTypes }): ReturnType<typeof generateProjectLint> {
  return generateProjectLint(
    normalize(options.root),
    join(normalize(options.root), 'tsconfig.json'),
    (options.linter as unknown as Linter) ?? (AvailableLinterTypes.ESLINT as unknown as Linter),
    [`${options.root}/**/*.ts`, `${options.root}/**/*.js`]
  )
}
