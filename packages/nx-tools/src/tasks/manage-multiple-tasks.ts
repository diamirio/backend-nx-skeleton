import { chain, Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import { Task } from './manage-multiple-tasks.interface'
import { registerCustomTaskRunnersRule } from '@rules/register-custom-task-runners.rule'
import { Logger } from '@utils/logger'

export function addMultipleDependentTasksRule<T extends Record<string, string>> (tasks: Task<T>[]): Rule {
  const TIMEOUT = 60000 * 1

  return chain([
    registerCustomTaskRunnersRule,

    async (host: Tree, context: SchematicContext): Promise<void> => {
      const logger = new Logger(context)
      const results: Record<PropertyKey, TaskId> = {}

      // start a timeout
      const startedAt = Date.now()

      while (tasks.length > 0) {
        // check for timeout
        if (Date.now() - startedAt > TIMEOUT) {
          throw new Error('Parsing tasks has timedout.')
        }

        // process the tasks
        await Promise.all(
          tasks.map(async (t, index) => {
            if (
              t?.condition !== false &&
              // might not have the depends on entry at all
              (!t.dependsOn ||
                // might have the depends on entry but the transaction may already be finished
                t.dependsOn.length > 0 && t.dependsOn.every((dependent) => Object.keys(results).includes(dependent as string)))
            ) {
              results[t.token] = t.fn(host, context, t.dependsOn ? t.dependsOn.map((dependent) => results[dependent]) : [])

              tasks.splice(index, 1)

              logger.debug(`Adding context task: ${t.token.toString()}`)
            } else if (t?.condition === false) {
              tasks.splice(index, 1)

              logger.debug('Condition does not meet for adding task: %s', t.token.toString())
            } else {
              logger.debug(`Adding context task still depends on adding others first: ${t.token.toString()} depends on ${t.dependsOn.join(', ')}`)
            }
          })
        )
      }
    }
  ])
}
