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

import { NormalizedSchema } from '../schema'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url('./files'), [
      template({
        ...names(options.name),
        ...options,
        tmpl: '',
        offsetFromRoot: offsetFromRoot(options.appProjectRoot)
      }),
      options.tests === 'none'
        ? filter((file) => file !== '/src/app/TEST.spec.tsx')
        : noop(),
      move(options.appProjectRoot)
    ])
  )
}