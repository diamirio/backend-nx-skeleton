import { Tree } from '@angular-devkit/schematics'
import { ListrTask } from 'listr2'

import { readWorkspaceLayout } from '@src/integration'

export function normalizePackageJsonScopeTask<Ctx extends Partial<{ name: string, packageName: string, packageScope: string }>> (host: Tree): ListrTask<Ctx> {
  return {
    title: 'Generating package.json name.',
    task: (ctx, task): void => {
      const layout = readWorkspaceLayout(host)

      ctx.packageScope = `@${layout.npmScope}`
      ctx.packageName = `${ctx.packageScope}/${ctx.name}`

      task.title = `Package name set: ${ctx.packageName}`
    }
  }
}
