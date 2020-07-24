import { chain, Rule, SchematicContext, Tree, branchAndMerge, MergeStrategy, mergeWith, noop } from '@angular-devkit/schematics'
import { addLintFiles, Linter } from '@nrwl/workspace'
import { eslintDeps, eslintJson } from '@utils/lint'
import { formatFiles, Logger } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateIntegration } from './lib/update-integration'
import { updateTsconfigPaths } from './lib/update-tsconfig-json'
import { Schema } from './main.interface'
import init from '@init/init'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      (): void => log.info('Initiating workspace.'),
      init({
        ...options,
        skipFormat: true
      }),

      (): void => log.info('Adding project to workspace.'),
      addProject(options),

      !host.exists(`${options.root}/.eslintrc`) ?
        chain([
          (): void => log.info('Adding eslint configuration.'),
          addLintFiles(options.root, Linter.EsLint, {
            localConfig: eslintJson,
            extraPackageDeps: eslintDeps
          })
        ]) :
        (): void => log.warn('Skipping since eslint configuration already exists.'),

      (): void => log.info('Creating application files.'),
      await createApplicationFiles(options, context),

      (): void => log.info('Updating integration with brownie.'),
      updateIntegration(options),

      (): void => log.info('Updating tsconfig files.'),
      updateTsconfigPaths(options),

      (): void => log.info('Formatting and linting files.'),
      formatFiles({ eslint: true, prettier: true })
    ])
  }
}
