import { apply, chain, externalSchematic, Rule, SchematicContext, url } from '@angular-devkit/schematics'
import { applyOverwriteWithDiff, createApplicationRule, CreateApplicationRuleInterface, Logger } from '@webundsoehne/nx-tools'
import { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'

/**
 * @param  {NormalizedSchema} options This should be the options parsed through.
 * @param  {SchematicContext} context
 * @returns Promise
 * A function that can create the application files for the given schematic.
 */
export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)
  // source is always the same
  const source = url(join('./files', options.type))

  return chain([
    applyOverwriteWithDiff(
      // just needs the url the rest it will do it itself
      apply(source, generateRules(options, log)),
      // needs the rule applied files, representing the prior configuration
      null,
      context
    ),

    externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
      silent: true,
      skipFormat: true,
      templates: {
        root: options.root,
        templates: [
          {
            cwd: options.root,
            output: 'index.ts',
            pattern: '**/*.module.ts'
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
    templates: [
      {
        condition: true,
        match: 'default',
        rename: options.name
      }
    ]
  }

  return createApplicationRule(template, options, { format: { prettier: false, eslint: false } })
}
