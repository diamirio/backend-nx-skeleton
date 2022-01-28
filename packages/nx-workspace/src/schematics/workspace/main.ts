import { chain, Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { TaskTokens } from './constants'
import { createApplicationFiles } from './lib/create-application-files'
import { normalizeOptions } from './lib/normalize-options'
import { Schema } from './main.interface'
import { addGitTask, addInstallTask, addMultipleDependentTasksRule, addRunWorkspaceScriptTask, Logger, PackageManagerUsableCommands, runInRule } from '@webundsoehne/nx-tools'

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
      createApplicationFiles(options),

      addMultipleDependentTasksRule<typeof TaskTokens>([
        {
          token: TaskTokens.GIT_INIT,
          fn: (_host: Tree, context: SchematicContext, dependencies: TaskId[]) =>
            addGitTask(
              context,
              {
                skipGit: options?.skipGit,
                root: options.root,
                commit: options?.commit
              },
              dependencies
            )
        },

        {
          token: TaskTokens.NPM_INSTALL,
          fn: (_host: Tree, context: SchematicContext, dependencies: TaskId[]) => addInstallTask(context, { skip: options.skipInstall, root: options.root }, dependencies),
          dependsOn: [ TaskTokens.GIT_INIT ]
        },

        {
          token: TaskTokens.PACKAGE_SCRIPT_LINT,
          fn: (_host: Tree, context: SchematicContext, dependencies: TaskId[]) =>
            addRunWorkspaceScriptTask(
              context,
              {
                root: options.root,
                action: {
                  action: PackageManagerUsableCommands.RUN,
                  command: 'lint'
                }
              },
              dependencies
            ),
          dependsOn: [ TaskTokens.NPM_INSTALL ]
        }
      ])
    ])
  }
}
