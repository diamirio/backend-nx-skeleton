import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { apply, chain, url } from '@angular-devkit/schematics'

import type { NormalizedSchema } from '../main.interface'
import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'
import type { CreateApplicationRuleInterface } from '@webundsoehne/nx-tools'
import { runInRule, applyOverwriteWithDiff, createApplicationRule, Logger } from '@webundsoehne/nx-tools'

export function createApplicationFiles (options: NormalizedSchema): Rule {
  return (_host: Tree, context: SchematicContext): Rule => {
    const log = new Logger(context)
    // source is always the same
    const source = url('./files')

    if (options?.priorConfiguration) {
      return chain([runInRule(log.warn.bind(log)('Library has already been generated before therefore skipping: %s@%s', options.name, options.root))])
    }

    return chain([
      applyOverwriteWithDiff(
        // just needs the url the rest it will do it itself
        apply(source, generateRules(options, log)),
        // needs the rule applied files, representing the prior configuration
        options?.priorConfiguration
          ? apply(source, generateRules(merge<NormalizedSchema>({ arrayMerge: ArrayMergeBehavior.OVERWRITE }, options, options.priorConfiguration), log))
          : null,
        context
      )
    ])
  }
}

function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
  log.debug('Generating rules for given options.')
  log.debug(JSON.stringify(options, null, 2))

  const template: CreateApplicationRuleInterface = {
    format: !!options.priorConfiguration
  }

  return createApplicationRule(template, options)
}
