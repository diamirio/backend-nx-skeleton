import { apply, chain, Rule, schematic, SchematicContext, url } from '@angular-devkit/schematics'
import {
  addSchematicTask,
  applyOverwriteWithDiff,
  createApplicationRule,
  CreateApplicationRuleInterface,
  deepMergeWithArrayOverwrite,
  Logger,
  runInRule
} from '@webundsoehne/nx-tools'

import { getSchematicFiles } from '../interfaces/file.constants'
import { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableExtensions, AvailableServerTypes } from '@interfaces/available.constants'
import { Schema as BackendInterfacesSchema } from '@src/schematics/backend-interfaces/main.interface'
import { Schema as ComponentSchema } from '@src/schematics/component/main.interface'
import { Schema as MspSchema } from '@src/schematics/microservice-provider/main.interface'

/**
 * Create application files in tree.
 * @param options
 * @param context
 */
export function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Rule {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  const componentSchematicDefaultOptions: Omit<ComponentSchema, 'type'> = {
    force: true,
    name: 'default',
    parent: options.name,
    mount: '/',
    silent: true,
    skipFormat: true,
    parentWsConfiguration: {
      root: options.root,
      sourceRoot: options.sourceRoot
    }
  }

  return chain([
    applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      options?.priorConfiguration ? apply(source, generateRules(deepMergeWithArrayOverwrite(options, options.priorConfiguration), log, { silent: true })) : null,
      context
    ),

    ...createApplicationRule({
      trigger: [
        {
          rule: runInRule(log.info.bind(log)('Adding default components to repository.'))
        },
        {
          condition:
            !options.priorConfiguration?.components?.includes(AvailableComponents.SERVER) &&
            options.components.includes(AvailableComponents.SERVER) &&
            options?.server === AvailableServerTypes.RESTFUL,
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableServerTypes.RESTFUL })
        },
        {
          condition:
            !options.priorConfiguration?.components?.includes(AvailableComponents.SERVER) &&
            options.components.includes(AvailableComponents.SERVER) &&
            options?.server === AvailableServerTypes.GRAPHQL,
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableServerTypes.GRAPHQL })
        },
        {
          condition: !options.priorConfiguration?.components?.includes(AvailableComponents.BG_TASK) && options.components.includes(AvailableComponents.BG_TASK),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.BG_TASK })
        },
        {
          condition: !options.priorConfiguration?.components?.includes(AvailableComponents.COMMAND) && options.components.includes(AvailableComponents.COMMAND),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.COMMAND })
        },
        {
          condition:
            !options.priorConfiguration?.components?.includes(AvailableComponents.MICROSERVICE_SERVER) && options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
          rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableComponents.MICROSERVICE_SERVER })
        },
        {
          condition: options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES),
          rule: addSchematicTask<BackendInterfacesSchema>('backend-interfaces', {})
        },
        {
          condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
          rule: addSchematicTask<MspSchema>('msp', {})
        }
      ]
    })

    // @TODO: this was here before so i am not sure if it was here before i implemented trigger or it has a particular reason, needs to be tested
    // options.components.includes(AvailableComponents.MICROSERVICE_SERVER) ? addSchematicTask<MspSchema>('msp', {}) : noop()
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
    format: true,
    include: getSchematicFiles(options),
    templates: [
      // server related templates with __
      ...[ AvailableServerTypes.RESTFUL, AvailableServerTypes.GRAPHQL ].map((a) => ({
        condition: options?.server === a,
        match: a
      })),
      // database related templates with __
      ...[
        { match: AvailableDBAdapters.TYPEORM, condition: [ AvailableDBTypes.TYPEORM_MYSQL, AvailableDBTypes.TYPEORM_POSTGRESQL ] },
        { match: AvailableDBAdapters.MONGOOSE, condition: [ AvailableDBTypes.MONGOOSE_MONGODB ] }
      ].map((a) => ({
        condition: a.condition.includes(options.database),
        match: a.match
      }))
    ]
  }

  return createApplicationRule(template, options)
}
