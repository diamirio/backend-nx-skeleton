import { Rule } from '@angular-devkit/schematics'
import { RunSchematicTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addSchematicTask<T> (name: string, options: T): Rule {
  return (_, context): void => {
    context.addTask(new RunSchematicTask<T>(name, options))
  }
}

/**
 * Add a external schmatic task to run after the actions finish.
 * @param pkg
 * @param name
 * @param options
 */
export function addExternalSchematicTask<T> (pkg: string, name: string, options: T): Rule {
  return (_, context): void => {
    context.addTask(new RunSchematicTask<T>(pkg, name, options))
  }
}
