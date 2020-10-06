import { chain, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics'
import { generateExportsRule } from '@rules/index'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'

export async function createApplicationFiles (options: NormalizedSchema, context: SchematicContext, host: Tree): Promise<Rule> {
  const source = url(join('./files'))

  return chain([ await generateExportsRule(source, host, context, options.template) ])
}

// function generateRules (options: NormalizedSchema, log: Logger): Rule[] {
//   log.debug('Generating rules for given options.')
//   log.debug(JSON.stringify(options, null, 2))

//   return createApplicationRule({}, options, { format: { prettier: false, eslint: false } })
// }
