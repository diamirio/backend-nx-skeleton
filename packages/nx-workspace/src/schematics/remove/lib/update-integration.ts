import type { Rule } from '@angular-devkit/schematics'
import { chain } from '@angular-devkit/schematics'

import type { NormalizedSchema } from '../main.interface'
import { removeNxJsonImplicitDependencies, removeTsConfigPathsRule } from '@webundsoehne/nx-tools'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  return chain([removeTsConfigPathsRule({ packageName: options.packageName }), removeNxJsonImplicitDependencies({ root: options.parentProjectConfiguration.root })])
}
