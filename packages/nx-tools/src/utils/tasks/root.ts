import { normalize } from '@angular-devkit/core'
import { Tree } from '@angular-devkit/schematics'
import { names } from '@nrwl/devkit'
import { ListrTask } from 'listr2'

import { NxProjectTypes } from '@src/constants'
import { readWorkspaceLayout } from '@src/integration'

export function normalizeRootDirectoryTask<Ctx extends Partial<{ name: string, root: string, directory: string, packageScope: string }>> (
  host: Tree,
  projectType: NxProjectTypes
): ListrTask<Ctx> {
  return {
    title: 'Setting project root directory.',
    task: (ctx, task): void => {
      if (ctx.directory) {
        ctx.directory = `${names(ctx.directory).fileName}/${names(ctx.name).fileName}`
      } else {
        ctx.directory = names(ctx.name).fileName
      }

      const layout = readWorkspaceLayout(host)

      ctx.root = normalize(`${layout[projectType === NxProjectTypes.APP ? 'appsDir' : 'libsDir']}/${ctx.directory}`)

      task.title = `Project root directory: ${ctx.root}`
    }
  }
}
