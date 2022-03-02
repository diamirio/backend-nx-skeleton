import type { BuilderContext } from '@angular-devkit/architect'
import type { SchematicContext } from '@angular-devkit/schematics'
import type { ExecutorContext } from '@nrwl/devkit'

/**
 * Returns whether this is the new type of context nx has old legacy context.
 */
export function isExecutorContext (context: BuilderContext | SchematicContext | ExecutorContext): context is ExecutorContext {
  if (!context || !context.hasOwnProperty('projectName')) {
    return false
  }

  return true
}

/**
 * Returns whether this given context is a run type of context or a build type of context.
 */
export function isBuildContext (context: BuilderContext | SchematicContext | ExecutorContext): context is BuilderContext {
  if (context && context.hasOwnProperty('target')) {
    return true
  }

  return false
}

export function hasProjectName (context: BuilderContext | SchematicContext | ExecutorContext): context is ExecutorContext {
  if (context && context.hasOwnProperty('projectName')) {
    return true
  }

  return false
}
