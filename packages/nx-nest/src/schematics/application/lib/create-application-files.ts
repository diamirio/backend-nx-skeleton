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

import { FileTemplatesInterface, OmitFoldersInterface } from './create-application-files.interface'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  const fileTemplates: FileTemplatesInterface[] = [
    {
      condition: options?.server !== 'restful',
      match: 'restful'
    },
    {
      condition: options?.server !== 'graphql',
      match: 'graphql'
    },
    {
      condition: !options.database.includes('typeorm'),
      match: 'typeorm'
    },
    {
      condition: !options.database.includes('mongoose'),
      match: 'mongoose'
    }
  ]

  const omitFolders: OmitFoldersInterface[] = [
    // tests configuration
    {
      condition: options.tests !== 'jest',
      match: (file): boolean => !file.match('*.spec.ts') && !file.match('src/test')
    },
    // server configuration
    {
      condition: !options.components.includes('server'),
      match: (file): boolean => !file.match('src/server/')
    },
    // bgtask aka nest-scheduler
    {
      condition: !options.components.includes('bgtask'),
      match: (file): boolean => !file.match('src/task/')
    },
    // command module
    {
      condition: !options.components.includes('command'),
      match: (file): boolean => !file.match('src/command/')
    },
    // microservices host
    {
      condition: !options.components.includes('microservice'),
      match: (file): boolean => !file.match('src/microservice/')
    }
  ]

  return mergeWith(
    apply(url('./files'), [
      ...fileTemplates.map((val) => {
        return val.condition
          ? filter((file) => !file.match(`__${val.match}__`))
          : noop
      }),

      // interpolate the templates
      jinjaTemplate({
        ...names(options.name),
        ...options,
        offsetFromRoot: offsetFromRoot(options.root)
      }, { templates: [ '.j2' ] } ),

      // clean up rest of the names
      template({
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.root),
        // replace __*__ from files
        ...fileTemplates.reduce((o, val) => ({ ...o, [val.match.toString()]: '' }), {})
      }),

      ...omitFolders.map((val) => {
        return val.condition
          ? filter((file) => val.match(file))
          : noop()
      }),

      // move all the files that are not filtered
      move(options.root)
    ])
  )
}
