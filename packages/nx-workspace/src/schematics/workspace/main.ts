import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { addGitTask, addInstallTask, formatOrSkip, Logger, runInRule } from '@webundsoehne/nx-tools'

/**
 * Entrypoint to the schematic.
 * @param schema
 */
export default function (schema: Schema): (host: Tree, context: SchematicContext) => Promise<Rule> {
  return async (host: Tree, context: SchematicContext): Promise<Rule> => {
    const log = new Logger(context)
    const options = await normalizeOptions(host, context, schema)

    return chain([
      runInRule(log.info.bind(log)('Creating workspace files.')),
      createApplicationFiles(options, context),

      addGitTask({
        skipGit: options?.skipGit,
        root: options.root,
        commit: options?.commit
      }),

      addInstallTask({ skipInstall: options.skipInstall, root: options.root }),

      formatOrSkip(log, false, { eslint: false, prettier: true })
    ])
  }
}
