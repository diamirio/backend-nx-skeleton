import { apply, chain, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { NormalizedSchema } from '../main.interface'

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

  const template: CreateApplicationRuleInterface = {
    templates: [
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
    ],
    omitFolders: [
      // tests configuration
      {
        condition: options.tests !== 'jest',
        match: (file: string): boolean => !(file.match('.spec.ts') && file.match('src/test/'))
      },
      // server configuration
      {
        condition: !options.components.includes('server'),
        match: (file: string): boolean => !file.match('src/server/')
      },
      // bgtask aka nest-scheduler
      {
        condition: !options.components.includes('bgtask'),
        match: (file: string): boolean => !file.match('src/task/')
      },
      // command module
      {
        condition: !options.components.includes('command'),
        match: (file: string): boolean => !file.match('src/command/')
      },
      // microservices host
      {
        condition: !options.components.includes('microservice-server'),
        match: (file: string): boolean => !file.match('src/microservice-server/')
      },
      {
        condition: !options.components.includes('microservice-client'),
        match: (file: string): boolean => !file.match('src/microservice-client/')
      },
      // omit constants when a single service is selected
      {
        condition: options.components.length === 1,
        match: (file: string): boolean => !file.match('src/constants.ts')
      }
    ]
  }

  return createApplicationRule(template, options)
}
