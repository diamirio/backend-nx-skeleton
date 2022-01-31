import type { Tree } from '@angular-devkit/schematics'
import type { ListrTask } from 'listr2'

import { readWorkspaceLayout } from '@integration'
import type { BaseNormalizedSchemaPackageName, BaseNormalizedSchemaPackageScope, BaseSchema, BaseSchemaParent } from '@interfaces/base-schemas.interface'

export function normalizeWorkspacePackageScopePrompt<Ctx extends BaseSchema & BaseNormalizedSchemaPackageScope> (host: Tree): ListrTask<Ctx>[] {
  return [
    {
      task: (ctx): void => {
        const layout = readWorkspaceLayout(host)

        ctx.packageScope = layout.npmScope
      }
    }
  ]
}

export function normalizePackageJsonNamePrompt<Ctx extends BaseSchema & BaseNormalizedSchemaPackageName> (host: Tree): ListrTask<Ctx>[] {
  return [
    ...normalizeWorkspacePackageScopePrompt(host),

    {
      title: 'Generating package.json name.',
      task: (ctx, task): void => {
        ctx.packageName = `@${ctx.packageScope}/${ctx.name}`

        task.title = `Package name set: ${ctx.packageName}`
      }
    }
  ]
}

export function normalizePackageJsonNameForParentPrompt<Ctx extends BaseSchemaParent & BaseNormalizedSchemaPackageName> (host: Tree): ListrTask<Ctx>[] {
  return [
    ...normalizeWorkspacePackageScopePrompt(host),

    {
      task: (ctx): void => {
        ctx.packageName = `@${ctx.packageScope}/${ctx.parent}`
      }
    }
  ]
}
