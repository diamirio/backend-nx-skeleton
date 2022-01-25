import { apply, branchAndMerge, chain, mergeWith, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { getSchematicFiles } from '@interfaces/file.constants'
import { createApplicationRule, CreateApplicationRuleInterface, Logger } from '@webundsoehne/nx-tools'

/**
 * Create application files in tree.
 * @param options
 * @param context
 */
export function createApplicationFiles (options: NormalizedSchema): Rule {
  return (_host: Tree, context: SchematicContext): Rule => {
    const log = new Logger(context)
    // source is always the same
    const source = url('./files')

    return chain([
      // just needs the url the rest it will do it itself
      mergeWith(apply(source, generateRules(options, log)))
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
    format: false,
    include: getSchematicFiles(options)
  }

  return createApplicationRule(template, options)
}
