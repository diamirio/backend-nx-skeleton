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

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url('./files'), [
      // filter out typeorm specific actions
      !options.database?.includes('typeorm')
        ? filter((file) => !file.match('__typeorm__'))
        : noop(),

      // interpolate the templates
      template({
        ...names(options.name),
        ...options,
        offsetFromRoot: offsetFromRoot(options.root),
        // replace __*__ from files
        tmpl: '',
        typeorm: ''
      }),

      // tests configuration
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

      // move all the files that are not filtered
      move(options.root)
    ])
  )
}