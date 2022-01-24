import { Tree } from '@angular-devkit/schematics'
import { directoryExists } from '@nrwl/workspace/src/utilities/fileutils'
import { ListrTask } from 'listr2'

import { BaseIntegration, readNxProjectIntegration, readProjectConfiguration } from '@src/integration'
import { EnrichedProjectConfiguration } from '@src/interfaces'

export function normalizePriorConfigurationTask<Ctx extends Partial<{ name: string, root: string, priorConfiguration: Record<string, any> }>, Integration extends BaseIntegration> (
  host: Tree,
  integrationKey: keyof Integration
): ListrTask<Ctx> {
  return {
    title: 'Checking the configuration...',
    task: (ctx, task): void => {
      if (directoryExists(ctx.root)) {
        task.output = `Project root directory is not empty at: ${ctx.root}`

        task.title = 'Searching for prior configuration...'

        const integration = readNxProjectIntegration<Integration>(host, ctx.name)
        if (integration?.[integrationKey]) {
          ctx.priorConfiguration = integration[integrationKey]

          task.title = 'Prior configuration recovered.'
        } else {
          throw new Error('Can not read the prior configuration.')
        }
      } else {
        task.title = 'This is the initial configuration of the package.'
      }
    },
    options: {
      persistentOutput: true,
      bottomBar: false
    }
  }
}

export function normalizeParentConfigurationTask<
  Ctx extends Partial<{
    parent: string
    parentPriorConfiguration: Record<string, any>
    parentProjectConfiguration: Record<string, any>
  }>,
  Integration extends BaseIntegration
> (host: Tree, integrationKey: keyof Integration, projectKeys: (keyof EnrichedProjectConfiguration<Integration>)[]): ListrTask<Ctx> {
  return {
    title: 'Checking the parent project configuration...',
    /**
     * if parent configuration is not injected through schematic we will parse it ourselves
     * this should be for cases that the schematic is not run internally and run through cli
     */
    enabled: (ctx): boolean => ctx.parentProjectConfiguration === undefined,
    task: (ctx, task): void => {
      // if this is created with this schematic there should be a nx json
      task.title = 'Searching for prior configuration of parent project...'

      const integration = readNxProjectIntegration<Integration>(host, ctx.parent)

      if (integration?.[integrationKey]) {
        ctx.parentPriorConfiguration = integration[integrationKey]

        task.title = 'Parent project integration has been found.'
      } else {
        throw new Error('Can not read prior configuration of the parent.')
      }

      // check parent configuration in workspace
      task.title = 'Fetching details of parent project configuration...'

      const workspace = readProjectConfiguration(host, ctx.parent)

      if (workspace && workspace.root && workspace.sourceRoot) {
        ctx.parentProjectConfiguration = (projectKeys as (keyof EnrichedProjectConfiguration<Integration>)[]).reduce((o, item) => {
          return { ...o, [item]: workspace[item] }
        }, {} as EnrichedProjectConfiguration<Integration>)

        task.title = 'Parent project configuration has been recovered.'
      } else {
        throw new Error('Can not read application configuration.')
      }
    }
  }
}
