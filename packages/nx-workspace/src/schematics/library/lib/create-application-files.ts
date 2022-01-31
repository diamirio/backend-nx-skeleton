import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { apply, chain, url } from '@angular-devkit/schematics'

import { getSchematicFiles } from '../interfaces/file.constants'
import type { NormalizedSchema } from '../main.interface'
import { deepMergeWithArrayOverwrite } from '@webundsoehne/deep-merge'
import type { CreateApplicationRuleInterface } from '@webundsoehne/nx-tools'
import { applyOverwriteWithDiff, createApplicationRule, Logger } from '@webundsoehne/nx-tools'

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
      applyOverwriteWithDiff(
        // just needs the url the rest it will do it itself
        apply(source, generateRules(options, log)),
        // needs the rule applied files, representing the prior configuration
        options?.priorConfiguration ? apply(source, generateRules(deepMergeWithArrayOverwrite(options, options.priorConfiguration), log, { silent: true })) : null,
        context
      ),

      ...createApplicationRule({
        trigger: []
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
    include: getSchematicFiles(options)
  }

  return createApplicationRule(template, options)
}
