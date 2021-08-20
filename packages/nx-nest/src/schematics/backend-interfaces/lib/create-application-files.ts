import { apply, chain, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import {
  addSchematicTask,
  applyOverwriteWithDiff,
  convertStringToDirPath,
  createApplicationRule,
  CreateApplicationRuleInterface,
  deepMergeWithArrayOverwrite,
  Logger
} from '@webundsoehne/nx-tools'
import { join } from 'path'

import { Schema as GeneratorSchema } from '../../generator/main.interface'
import { getSchematicFiles, SchematicFilesMap } from '../interfaces/file.constants'
import { NormalizedSchema } from '../main.interface'
import { AvailableDBAdapters, AvailableGenerators } from '@interfaces/available.constants'

export function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Rule {
  const log = new Logger(context)
  // source is always the same
  const source = url('./files')

  return chain([
    applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      options?.priorConfiguration ? apply(source, generateRules(deepMergeWithArrayOverwrite<NormalizedSchema>(options, options.priorConfiguration), log)) : null,
      context
    ),

    ...createApplicationRule({
      trigger: [
        {
          condition: !options?.priorConfiguration && options.dbAdapters.includes(AvailableDBAdapters.MONGOOSE),
          rule: addSchematicTask<GeneratorSchema>('generator', {
            silent: false,
            skipFormat: false,
            name: 'default',
            type: AvailableGenerators.MONGOOSE_ENTITY_TIMESTAMPS,
            directory: join(options.root, options.sourceRoot, SchematicFilesMap[AvailableDBAdapters.MONGOOSE]),
            exports: [
              {
                output: 'index.ts',
                pattern:
                  convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + `${SchematicFilesMap[AvailableDBAdapters.MONGOOSE]}/**/*.entity.ts`
              }
            ]
          })
        },

        {
          condition: !options?.priorConfiguration && options.dbAdapters.includes(AvailableDBAdapters.TYPEORM),
          rule: addSchematicTask<GeneratorSchema>('generator', {
            silent: false,
            skipFormat: false,
            name: 'default',
            type: AvailableGenerators.TYPEORM_ENTITY_PRIMARY,
            directory: join(options.root, options.sourceRoot, SchematicFilesMap[AvailableDBAdapters.TYPEORM]),
            exports: [
              {
                output: 'index.ts',
                pattern:
                  convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + `${SchematicFilesMap[AvailableDBAdapters.TYPEORM]}/**/*.entity.ts`
              }
            ]
          })
        }
      ]
    })
  ])
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    format: true,
    include: getSchematicFiles(options),
    templates: [
      // server related templates with __
      ...Object.values(AvailableDBAdapters).map((a) => ({
        condition: options?.dbAdapters.includes(a),
        match: a
      }))
    ]
  }

  return createApplicationRule(template, options)
}
