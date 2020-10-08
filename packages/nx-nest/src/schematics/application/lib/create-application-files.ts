import { normalize } from '@angular-devkit/core'
import { apply, chain, externalSchematic, Rule, schematic, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger, runInRule } from '@webundsoehne/nx-tools'
import { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'
import merge from 'deepmerge'

import { NormalizedSchema } from '../main.interface'
import { Schema as ComponentSchema } from '@src/schematics/component/main.interface'

export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  const componentSchematicDefaultOptions: Partial<ComponentSchema> = {
    force: true,
    name: 'test2',
    parent: options.name,
    silent: true,
    skipFormat: true,
    parentWsConfiguration: {
      root: options.root,
      sourceRoot: options.sourceRoot
    }
  }

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
            log,
            { silent: true }
          )
        )
        : null,
      context
    ),

    ...createApplicationRule({
      trigger: [
        {
          rule: runInRule(log.info.bind(log), 'Adding default components to repository.')
        },
        {
          condition: options.components.includes('server') && options.server === 'restful',
          rule: schematic<ComponentSchema>('component', { ...(componentSchematicDefaultOptions as ComponentSchema), type: 'restful' })
        }
      ]
    })
  ])
}

export function generateRules (options: NormalizedSchema, log: Logger, settings?: { silent?: boolean }): Rule[] {
  if (!settings?.silent) {
    log.debug('Generating rules for given options.')
    log.debug(JSON.stringify(options, null, 2))
  }

  const template: CreateApplicationRuleInterface = {
    templates: [
      {
        condition: options?.server === 'restful',
        match: 'restful'
      },
      {
        condition: options?.server === 'graphql',
        match: 'graphql'
      },
      {
        condition: options.database.includes('typeorm'),
        match: 'typeorm'
      },
      {
        condition: options.database.includes('mongoose'),
        match: 'mongoose'
      }
    ],

    omit: [
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
