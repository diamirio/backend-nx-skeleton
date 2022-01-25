import { Tree } from '@angular-devkit/schematics'
import { ListrTask } from 'listr2'

import { readWorkspaceLayout } from '@integration'
import { BaseNormalizedSchemaPackageName, BaseNormalizedSchemaPackageScope, BaseSchema } from '@interfaces/base-schemas.interface'

export function normalizeWorkspacePackageScopeTask<Ctx extends BaseSchema & BaseNormalizedSchemaPackageScope> (host: Tree): ListrTask<Ctx>[] {
  return [
    {
      task: (ctx): void => {
        const layout = readWorkspaceLayout(host)

        ctx.packageScope = layout.npmScope
      }
    }
  ]
}

export function normalizePackageJsonNameTask<Ctx extends BaseSchema & BaseNormalizedSchemaPackageScope & BaseNormalizedSchemaPackageName> (host: Tree): ListrTask<Ctx>[] {
  return [
    ...normalizeWorkspacePackageScopeTask(host),

    {
      title: 'Generating package.json name.',
      task: (ctx, task): void => {
        ctx.packageName = `@${ctx.packageScope}/${ctx.name}`

        task.title = `Package name set: ${ctx.packageName}`
      }
    }
  ]
}
