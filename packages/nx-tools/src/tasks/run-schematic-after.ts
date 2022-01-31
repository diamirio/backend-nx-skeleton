import type { Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'
import { RunSchematicTask } from '@angular-devkit/schematics/tasks'

/**
 * Add a schematic task to run after the actions finish.
 * @param schematic
 * @param options
 */
export function addSchematicTask<T> (context: SchematicContext, schematic: string, options: T, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunSchematicTask<T>(schematic, options), dependencies)
}

export function addSchematicTaskRule<T> (schematic: string, options: T, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addSchematicTask(context, schematic, options, dependencies)
  }
}

/**
 * Add a external schmatic task to run after the actions finish.
 * @param collection
 * @param schematic
 * @param options
 */
export function addExternalSchematicTask<T> (context: SchematicContext, collection: string, schematic: string, options: T, dependencies?: TaskId[]): TaskId {
  return context.addTask(new RunSchematicTask<T>(collection, schematic, options), dependencies)
}

export function addExternalSchematicTaskRule<T> (collection: string, schematic: string, options: T, dependencies?: TaskId[]): Rule {
  return (_: Tree, context: SchematicContext): void => {
    addExternalSchematicTask(context, collection, schematic, options, dependencies)
  }
}
