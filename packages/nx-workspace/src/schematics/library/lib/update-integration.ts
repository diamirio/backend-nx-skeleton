import type { Rule } from '@angular-devkit/schematics'
import { chain, noop } from '@angular-devkit/schematics'

import type { NormalizedSchema } from '../main.interface'
import type { NxWorkspaceIntegration } from '@integration'
import { AvailableLibraryTypes } from '@interfaces'
import { BrownieAvailableContainers, updateBrownieIntegrationRule, updateNxIntegrationRule } from '@webundsoehne/nx-tools'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  return (): Rule => {
    const integrationKeys: (keyof NormalizedSchema['priorConfiguration'])[] = ['tests', 'type']

    return chain([
      // add the components that needs to be known
      updateNxIntegrationRule<NxWorkspaceIntegration>(options.name, {
        library: integrationKeys.reduce<NxWorkspaceIntegration['library']>(
          (o, key) => ({
            ...o,
            [key]: options[key]
          }),
          {}
        )
      }),

      // add nx container
      [AvailableLibraryTypes.BUILDABLE].includes(options.type) ? updateBrownieIntegrationRule(options.name, { containers: [BrownieAvailableContainers.NX] }) : noop()
    ])
  }
}
