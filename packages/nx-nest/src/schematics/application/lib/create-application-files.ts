import {
  apply,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  template,
  url
} from '@angular-devkit/schematics'
import { names, offsetFromRoot } from '@nrwl/workspace'

import { NormalizedSchema } from '@application/schema'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url('./files'), [
      template({
        ...names(options.name),
        ...options,
        tmpl: '',
        offsetFromRoot: offsetFromRoot(options.root)
      }),
      options.tests === 'none'
        ? filter((file) => file !== '*.spec.ts')
        : noop(),
      // filter out server files, if not selected
      !options.components.includes('server')
        ? filter((file) => !file.match('src/server/'))
        : noop(),
      // filter out bgtask files, if not selected
      !options.components.includes('bgtask')
        ? filter((file) => !file.match('src/task/'))
        : noop(),
      // filter out command files, if not selected
      !options.components.includes('command')
        ? filter((file) => !file.match('src/command/'))
        : noop(),
      move(options.root)
    ])
  )
}