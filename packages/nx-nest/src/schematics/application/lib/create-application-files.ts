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
import { jinjaTemplate } from '@webundsoehne/nx-tools'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url('./files'), [
      // filter these out before templating
      // filter out typeorm specific actions
      options?.server !== 'restful'
        ? filter((file) => !file.match('__restful__'))
        : noop(),

      options?.server !== 'graphql'
        ? filter((file) => !file.match('__graphql__'))
        : noop(),

      !options.database.includes('typeorm')
        ? filter((file) => !file.match('__typeorm__'))
        : noop(),

      // filter out mongoose specific actions
      !options.database.includes('mongoose')
        ? filter((file) => !file.match('__mongoose__'))
        : noop(),

      // interpolate the templates
      jinjaTemplate({
        ...names(options.name),
        ...options,
        offsetFromRoot: offsetFromRoot(options.root)
        // replace __*__ from files
        // tmpl: '',
        // typeorm: '',
        // mongoose: '',
        // graphql: '',
        // restful: ''
      }, { templates: [ '.tmpl.j2' ] } ),

      // clean up rest of the names
      // template({
      //   ...names(options.name),
      //   offsetFromRoot: offsetFromRoot(options.root)
      //   // replace __*__ from files
      //   // tmpl: '',
      //   // typeorm: '',
      //   // mongoose: '',
      //   // graphql: '',
      //   // restful: ''
      // }),

      // tests configuration
      options.tests !== 'jest'
        ? filter((file) => !file.match('*.spec.ts') && !file.match('src/test'))
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

      // filter out microservice service, if not selected
      !options.components.includes('microservice')
        ? filter((file) => !file.match('src/microservice/'))
        : noop(),

      // move all the files that are not filtered
      move(options.root)
    ])
  )
}