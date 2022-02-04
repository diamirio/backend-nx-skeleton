import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { apply, chain, schematic, url } from '@angular-devkit/schematics'
import { join } from 'path'

import { getSchematicFiles, SchematicFilesMap } from '../interfaces/file.constants'
import type { NormalizedSchema } from '../main.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableExtensions, AvailableGenerators, AvailableServerTypes } from '@interfaces/available.constants'
import type { Schema as BackendInterfacesSchema } from '@schematics/backend-interfaces/main.interface'
import { ComponentLocationsMap } from '@schematics/component/interfaces/file.constants'
import type { Schema as ComponentSchema } from '@schematics/component/main.interface'
import type { Schema as GeneratorSchema } from '@schematics/generator/main.interface'
import type { Schema as MspSchema } from '@schematics/microservice-provider/main.interface'
import { deepMergeWithArrayOverwrite } from '@webundsoehne/deep-merge'
import type { CreateApplicationRuleInterface } from '@webundsoehne/nx-tools'
import { addNxImplicitDependenciesRule, addSchematicTaskRule, applyOverwriteWithDiff, createApplicationRule, Logger, runInRule } from '@webundsoehne/nx-tools'

/**
 * Create application files in tree.
 * @param options
 * @param context
 */
export function createApplicationFiles (options: NormalizedSchema): Rule {
  return (host: Tree, context: SchematicContext): Rule => {
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
      parentProjectConfiguration: {
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

      addNxImplicitDependenciesRule({ [join(options.root, 'config', '**')]: [options.name] }),

      ...createApplicationRule({
        trigger: [
          // default components
          {
            rule: runInRule(log.info.bind(log)('Adding default components to repository.'))
          },
          {
            condition:
              !options.priorConfiguration?.server?.includes(AvailableComponents.SERVER) &&
              options.components.includes(AvailableComponents.SERVER) &&
              options?.server === AvailableServerTypes.RESTFUL &&
              !ComponentLocationsMap[AvailableServerTypes.RESTFUL].some((location) => host.exists(join(options.root, options.sourceRoot, location, 'index.ts'))),
            rule: schematic<ComponentSchema>('component', { ...componentSchematicDefaultOptions, type: AvailableServerTypes.RESTFUL })
          },
          {
            condition:
              !options.priorConfiguration?.server?.includes(AvailableComponents.SERVER) &&
              options.components.includes(AvailableComponents.SERVER) &&
              options?.server === AvailableServerTypes.GRAPHQL &&
              !ComponentLocationsMap[AvailableServerTypes.GRAPHQL].some((location) => host.exists(join(options.root, options.sourceRoot, location, 'index.ts'))),
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

          // backend-interfaces is extension selected
          {
            condition: options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES),
            rule: addSchematicTaskRule<BackendInterfacesSchema>('backend-interfaces', {})
          },

          // microservice-provider if microservice-server is defined
          {
            condition: options.components.includes(AvailableComponents.MICROSERVICE_SERVER),
            rule: addSchematicTaskRule<MspSchema>('msp', {})
          },

          // generate default entities
          {
            condition:
              options.priorConfiguration?.dbAdapters !== AvailableDBAdapters.TYPEORM &&
              options.dbAdapters === AvailableDBAdapters.TYPEORM &&
              !options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES),
            rule: addSchematicTaskRule<GeneratorSchema>('generator', {
              name: 'default',
              type: AvailableGenerators.TYPEORM_ENTITY_PRIMARY,
              directory: join(options.root, options.sourceRoot, SchematicFilesMap[AvailableDBAdapters.TYPEORM]),
              exports: [{ output: 'index.ts', pattern: '**/*.entity.ts' }]
            })
          },

          {
            condition:
              options.priorConfiguration?.dbAdapters !== AvailableDBAdapters.MONGOOSE &&
              options.dbAdapters === AvailableDBAdapters.MONGOOSE &&
              !options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES),
            rule: addSchematicTaskRule<GeneratorSchema>('generator', {
              name: 'default',
              type: AvailableGenerators.MONGOOSE_ENTITY_TIMESTAMPS,
              directory: join(options.root, options.sourceRoot, SchematicFilesMap[AvailableDBAdapters.MONGOOSE]),
              exports: [{ output: 'index.ts', pattern: '**/*.entity.ts' }]
            })
          },

          {
            condition:
              options.components.includes(AvailableComponents.BG_TASK) &&
              options.priorConfiguration?.dbAdapters !== AvailableDBAdapters.TYPEORM &&
              options.dbAdapters === AvailableDBAdapters.TYPEORM,
            rule: addSchematicTaskRule<GeneratorSchema>('generator', {
              name: 'migration',
              type: AvailableGenerators.TYPEORM_MIGRATION_TASK_MODULE,
              directory: join(options.root, options.sourceRoot, SchematicFilesMap[AvailableComponents.BG_TASK], SchematicFilesMap.MODULES),
              exports: [{ output: 'index.ts', pattern: '**/*.module.ts' }]
            })
          }
        ]
      })
    ])
  }
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
      ...[AvailableServerTypes.RESTFUL, AvailableServerTypes.GRAPHQL].map((a) => ({
        condition: options?.server === a,
        match: a
      })),
      // database related templates with __
      ...[
        {
          match: AvailableDBAdapters.TYPEORM,
          condition: options.dbAdapters === AvailableDBAdapters.TYPEORM && !options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES)
        },
        {
          match: AvailableDBAdapters.MONGOOSE,
          condition: options.dbAdapters === AvailableDBAdapters.MONGOOSE && !options.extensions.includes(AvailableExtensions.EXTERNAL_BACKEND_INTERFACES)
        }
      ].map((a) => ({
        condition: a.condition,
        match: a.match
      }))
    ]
  }

  return createApplicationRule(template, options)
}
