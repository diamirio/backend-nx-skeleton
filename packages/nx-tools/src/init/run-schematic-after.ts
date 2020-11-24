import { Rule } from '@angular-devkit/schematics'
import { RunSchematicTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a schematic task to run after the actions finish.
 * @param s
 * @param o
 */
export function addSchematicTask<T> (s: string, o: T): Rule {
  return (_, context): void => {
    context.addTask(new RunSchematicTask<T>(s, o))
  }
}

/**
 * Add a external schmatic task to run after the actions finish.
 * @param c
 * @param s
 * @param o
 */
export function addExternalSchematicTask<T> (c: string, s: string, o: T): Rule {
  return (_, context): void => {
    context.addTask(new RunSchematicTask<T>(c, s, o))
  }
}
