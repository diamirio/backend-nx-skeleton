import { BuilderContext } from '@angular-devkit/architect'
import { SchematicContext } from '@angular-devkit/schematics'
import { ExecutorContext } from '@nrwl/devkit'

/**
 * Returns whether this is the new type of context nx has old legacy context.
 */
export function isExecutorContext (context: BuilderContext | SchematicContext | ExecutorContext): context is ExecutorContext {
  if (!context || context.hasOwnProperty('logger')) {
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
