import { chain, Rule, url } from '@angular-devkit/schematics'
import { generateExportsRule } from '@rules/index'
import { join } from 'path'

import { NormalizedSchema } from '../main.interface'

export async function createApplicationFiles (options: NormalizedSchema): Promise<Rule> {
  const source = url(join('./files'))

  return chain([ generateExportsRule(source, options.templates, 'exports.ts.j2') ])
}
