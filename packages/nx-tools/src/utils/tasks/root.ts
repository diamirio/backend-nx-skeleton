import { normalize } from '@angular-devkit/core'
import { Tree } from '@angular-devkit/schematics'
import { NxProjectTypes } from '@constants'
import { ListrTask } from 'listr2'

import { generateNameCases } from '..'
import { readWorkspaceLayout } from '@integration'

export function normalizeRootDirectoryTask<Ctx extends Partial<{ name: string, root: string, directory: string, packageScope: string }>> (
  host: Tree,
  projectType: NxProjectTypes
): ListrTask<Ctx>[] {
  return [
    {
      title: 'Setting project root directory.',
      task: (ctx, task): void => {
        if (ctx.directory) {
          ctx.directory = `${generateNameCases(ctx.directory).kebab}/${generateNameCases(ctx.name).kebab}`
        } else {
          ctx.directory = generateNameCases(ctx.name).kebab
        }

        const layout = readWorkspaceLayout(host)

        ctx.root = normalize(`${layout[projectType === NxProjectTypes.APP ? 'appsDir' : 'libsDir']}/${ctx.directory}`)

        task.title = `Project root directory: ${ctx.root}`
      }
    }
  ]
}
