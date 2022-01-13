import { apply, chain, externalSchematic, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { join } from 'path'

import { NormalizedSchema, ParsedMicroservice } from '../main.interface'
import { deepMergeWithArrayOverwrite } from '@webundsoehne/deep-merge'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger, convertStringToDirPath } from '@webundsoehne/nx-tools'
import { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'

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

    externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
      silent: true,
      skipFormat: true,
      templates: {
        root: options.root,
        templates: [
          {
            output: convertStringToDirPath(options.sourceRoot) + 'patterns/index.ts',
            pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'patterns/**/*.constants.ts'
          },
          {
            output: convertStringToDirPath(options.sourceRoot) + 'interfaces/index.ts',
            pattern: convertStringToDirPath(join(options.root, options.sourceRoot), { start: true, end: true }) + 'interfaces/**/*.interface.ts'
          }
        ]
      }
    })
  ])
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    multipleTemplates: [
      {
        templates: options.microservices.map((microservice) => ({
          path: new RegExp('src/patterns/__pattern__.constants.ts.j2'),
          output: `src/patterns/${microservice.names.file}.constants.ts`,
          factory: (): ParsedMicroservice => {
            return microservice
          }
        }))
      },

      {
        templates: options.microservices.map((microservice) => ({
          path: new RegExp('src/interfaces/__interface__.interface.ts.j2'),
          output: `src/interfaces/${microservice.names.file}.interface.ts`,
          factory: (): ParsedMicroservice => {
            return microservice
          }
        }))
      }
    ]
  }

  return createApplicationRule(template, options)
}
