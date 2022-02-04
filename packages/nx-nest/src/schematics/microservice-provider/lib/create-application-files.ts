import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { apply, chain, externalSchematic, url } from '@angular-devkit/schematics'
import { join } from 'path'

import type { NormalizedSchema, ParsedMicroservice } from '../main.interface'
import { deepMergeWithArrayOverwrite } from '@webundsoehne/deep-merge'
import type { CreateApplicationRuleInterface } from '@webundsoehne/nx-tools'
import { applyOverwriteWithDiff, createApplicationRule, Logger, convertStringToDirPath } from '@webundsoehne/nx-tools'
import type { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return (_host: Tree, context: SchematicContext): Rule => {
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
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    multipleTemplates: [
      {
        condition: options.microservices.length > 0,
        templates: options.microservices.map((microservice) => ({
          path: new RegExp('src/patterns/__pattern__.constants.ts.j2'),
          output: `src/patterns/${microservice.names.file}.constants.ts`,
          factory: (): ParsedMicroservice => {
            return microservice
          }
        }))
      },

      {
        condition: options.microservices.length > 0,
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
