import { apply, chain, Rule, schematic, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger, runInRule } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'
import { Schema as ComponentSchema } from '@src/schematics/component/main.interface'

/**
 * Create application files in tree.
 * @param options
 * @param context
 */
export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  const componentSchematicDefaultOptions: Omit<ComponentSchema, 'type'> = {
    force: true,
    name: 'default',
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
          condition: options.components.includes(AvailableComponents.SERVER) && options?.server === AvailableServerTypes.RESTFUL,
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableServerTypes.RESTFUL })
        },
        {
          condition: options.components.includes(AvailableComponents.SERVER) && options?.server === AvailableServerTypes.GRAPHQL,
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableServerTypes.GRAPHQL })
        },
        {
          condition: options.components.includes(AvailableComponents.BG_TASK),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.BG_TASK })
        },
        {
          condition: options.components.includes(AvailableComponents.COMMAND),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.COMMAND })
        },
        {
          condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.MICROSERVICE_SERVER })
        }
      ]
    })
  ])
}

/**
 * Generate rules individually since it is required to do this twice because of diff-merge like architecture.
 * @param options
 * @param log
 * @param settings
 */
export function generateRules (options: NormalizedSchema, log: Logger, settings?: { silent?: boolean }): Rule[] {
  if (!settings?.silent) {
    log.debug('Generating rules for given options.')
    log.debug(JSON.stringify(options, null, 2))
  }

  const template: CreateApplicationRuleInterface = {
    templates: [
      {
        condition: options?.server === AvailableServerTypes.RESTFUL,
        match: AvailableServerTypes.RESTFUL
      },
      {
        condition: options?.server === AvailableServerTypes.GRAPHQL,
        match: AvailableServerTypes.GRAPHQL
      },
      // this might be shared so not using enum
      {
        condition: [ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ].includes(options.database),
        match: 'typeorm'
      },
      {
        condition: [ AvailableDBTypes.MONGOOSE_MONGODB ].includes(options.database),
        match: 'mongoose'
      }
    ],

    omit: [
      // tests configuration
      {
        condition: options.tests !== AvailableTestsTypes.JEST,
        match: (file: string): boolean => !(file.match('.spec.ts') && file.match('tests/'))
      },
      // server configuration
      {
        condition: !options.components.includes(AvailableComponents.SERVER),
        match: (file: string): boolean => !file.match('src/server/')
      },
      // bgtask aka nest-scheduler
      {
        condition: !options.components.includes(AvailableComponents.BG_TASK),
        match: (file: string): boolean => !file.match('src/task/')
      },
      // command module
      {
        condition: !options.components.includes(AvailableComponents.COMMAND),
        match: (file: string): boolean => !file.match('src/command/')
      },
      // microservices host
      {
        condition: !options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
        match: (file: string): boolean => !file.match('src/microservice-server/')
      },
      {
        condition: !options.components.includes(AvailableComponents.MICROSERVICE_CLIENT),
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
