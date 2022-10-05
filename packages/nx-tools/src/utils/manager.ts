import type { BuilderContext } from '@angular-devkit/architect'
import type { SchematicContext } from '@angular-devkit/schematics'
import type { ExecutorContext } from '@nrwl/devkit'
import type { ListrBaseClassOptions, ListrContext } from 'listr2'
import { Manager as BaseManager } from 'listr2'

import { ListrLogger } from '@utils/logger/listr-logger'
import { isVerbose } from '@utils/schematics/is-verbose'

export class Manager<Ctx extends ListrContext> extends BaseManager<Ctx, 'default', 'verbose'> {
  constructor (context: BuilderContext | SchematicContext | ExecutorContext, options?: ListrBaseClassOptions<Ctx, 'default', 'verbose'>) {
    super({
      nonTTYRendererOptions: { logger: ListrLogger, options: context },
      rendererFallback: isVerbose(),
      ...options
    })
  }
}
