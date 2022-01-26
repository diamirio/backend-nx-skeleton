import { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { RunSchematicTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a schematic task to run after the actions finish.
 * @param name
 * @param options
 */
export function addSchematicTask<T> (context: SchematicContext, name: string, options: T, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunSchematicTask<T>(name, options), dependencies)
}

export function addSchematicTaskRule<T> (name: string, options: T, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addSchematicTask(context, name, options, dependencies)
  }
}

/**
 * Add a external schmatic task to run after the actions finish.
 * @param pkg
 * @param name
 * @param options
 */
export function addExternalSchematicTask<T> (context: SchematicContext, pkg: string, name: string, options: T, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunSchematicTask<T>(pkg, name, options), dependencies)
}

export function addExternalSchematicTaskRule<T> (pkg: string, name: string, options: T, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addExternalSchematicTask(context, pkg, name, options, dependencies)
  }
}
