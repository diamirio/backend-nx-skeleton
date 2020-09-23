import { apply, chain, filter, move, noop, Rule, SchematicContext, template, url } from '@angular-devkit/schematics'
import { names, offsetFromRoot } from '@nrwl/workspace'
import { applyOverwriteWithDiff, formatFiles, jinjaTemplate, Logger } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { FileTemplatesInterface, OmitFoldersInterface } from '../interfaces/create-application-files.interface'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  return chain([
    await applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      options?.priorConfiguration
        ? apply(
          source,
          generateRules(
            merge<NormalizedSchema>(options, options.priorConfiguration, { arrayMerge: (target, source) => source }),
            log
          )
        )
        : null,
      context
    )
  ])
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

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
      match: (file): boolean => !(file.match('.spec.ts') && file.match('src/test/'))
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
    },
    // omit constants when a single service is selected
    {
      condition: options.components.length === 1,
      match: (file): boolean => !file.match('src/constants.ts')
    }
  ]

  return [
    // clean up unwanted folders from tree
    ...fileTemplates.map((val) => {
      return val.condition ? filter((file) => !file.match(`__${val.match}__`)) : noop
    }),

    // interpolate the templates
    jinjaTemplate(
      {
        ...names(options.name),
        ...options,
        offsetFromRoot: offsetFromRoot(options.root)
      },
      { templates: [ '.j2' ] }
    ),

    // clean up rest of the names
    template({
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.root),
      // replace __*__ from files
      ...fileTemplates.reduce((o, val) => ({ ...o, [val.match.toString()]: '' }), {})
    }),

    // omit some folders
    ...omitFolders.map((val) => {
      return val.condition ? filter((file) => val.match(file)) : noop()
    }),

    // need to format files before putting them through difference, or else it goes crazy.
    formatFiles({ eslint: true, prettier: true }),

    // move all the files to package root
    move(options.root)
  ]
}
