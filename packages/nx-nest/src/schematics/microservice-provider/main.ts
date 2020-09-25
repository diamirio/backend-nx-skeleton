import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { formatFiles, Logger } from '@webundsoehne/nx-tools'

import { addProject } from './lib/add-project'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { updateTsconfigPaths } from './lib/update-tsconfig-json'
import { Schema } from './main.interface'

export default function (schema: Schema): Rule {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      (): void => log.info('Adding project to workspace.'),
      addProject(options),

      (): void => log.info('Creating application files.'),
      await createApplicationFiles(options, context),

      (): void => log.info('Updating tsconfig files.'),
      updateTsconfigPaths(options),

      (): void => log.info('Formatting and linting files.'),
      formatFiles({ eslint: true, prettier: true })
    ])
  }
}
