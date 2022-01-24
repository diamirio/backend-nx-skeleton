import { chain, noop, Rule } from '@angular-devkit/schematics'

import { NormalizedSchema } from '../main.interface'
import { NxWorkspaceIntegration } from '@src/integration'
import { AvailableLibraryTypes } from '@src/interfaces'
import { BrownieAvailableContainers, updateBrownieIntegrationRule, updateNxIntegrationRule } from '@webundsoehne/nx-tools'

/**
 * Update integration with different interfaces.
 * @param options
 */
export function updateIntegration (options: NormalizedSchema): Rule {
  return (): Rule => {
    const integrationKeys: (keyof NormalizedSchema['priorConfiguration'])[] = [ 'tests', 'type' ]

    return chain([
      // add the components that needs to be known
      updateNxIntegrationRule<NxWorkspaceIntegration>(options.name, {
        library: integrationKeys.reduce(
          (o, key) => ({
            ...o,
            [key]: options[key]
          }),
          {} as NxWorkspaceIntegration['library']
        )
      }),

      // add nx container
      [ AvailableLibraryTypes.BUILDABLE ].includes(options.type) ? updateBrownieIntegrationRule(options.name, { containers: [ BrownieAvailableContainers.NX ] }) : noop()
    ])
  }
}
