import { apply, chain, externalSchematic, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'
import { Schema as ExportsSchema } from '@schematics/exports/main.interface'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface } from '@src/rules'
import { Logger } from '@src/utils'

/**
 * @param  {NormalizedSchema} options This should be the options parsed through.
 * @param  {SchematicContext} context
 * @returns Promise
 * A function that can create the application files for the given schematic.
 */
export function createApplicationFiles (files: string, options: NormalizedSchema, context: SchematicContext): Rule {
  const log = new Logger(context)
  // source is always the same
  const source = url(join(files, options.type))

  return chain([
    applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      null,
      context
    ),

    ...createApplicationRule({
      trigger: [
        {
          condition: !!options.exports,
          rule: externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
            silent: true,
            skipFormat: false,
            templates: {
              root: options.root,
              templates: options.exports
            }
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
    templates: [
      {
        condition: true,
        match: 'default',
        rename: options.name
      }
    ],
    omit: [ { condition: true, match: (file): boolean => !file.endsWith('description.txt') } ]
  }

  return createApplicationRule(template, options, { format: { prettier: true, eslint: true } })
}
