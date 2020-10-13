import { chain, Rule, url } from '@angular-devkit/schematics'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'
import { generateExportsRule } from '@rules/generate-exports.rule'

/**
 * Creates application files for auto generating exports.
 *
 * Not intended to be a schematic that is called externally but mostly internally.
 * @param options
 */
export async function createApplicationFiles (options: NormalizedSchema): Promise<Rule> {
  const source = url(join('./files'))

  return chain([ generateExportsRule(source, options.templates, 'exports.ts.j2') ])
}
