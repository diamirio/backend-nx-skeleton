import type { Rule } from '@angular-devkit/schematics'
import { chain, url } from '@angular-devkit/schematics'

import type { NormalizedSchema } from '../main.interface'
import { generateExportsRule } from '@rules/generate-exports.rule'

/**
 * Creates application files for auto generating exports.
 *
 * Not intended to be a schematic that is called externally but mostly internally.
 * @param options
 */
export function createApplicationFiles (options: NormalizedSchema): Rule {
  const source = url('./files')

  return chain([ generateExportsRule(source, options.templates, 'exports.ts.j2') ])
}
