import {
  apply,
  forEach,
  mergeWith,
  Rule,
  SchematicContext,
  Source,
  Tree
} from '@angular-devkit/schematics'
import { Logger } from '@utils/logger'
import * as diff from 'diff'
import { Observable } from 'rxjs'

// FIXME: branchandmerge bug: https://github.com/angular/angular-cli/issues/11337A
export async function applyOverwriteWithDiff (source: Source, oldSource: Source, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)

  // generate the old tree without aplying something
  let oldTree: Tree
  if (oldSource) {
    oldTree = await (oldSource(context) as unknown as Observable<Tree>).toPromise()
  }

  return (tree: Tree): Rule => {
    return mergeWith(
      apply(source, [
        forEach((file) => {
          if (tree.exists(file.path)) {
            log.warn(`File already exists: "${file.path}"`)

            if (oldTree?.exists(file.path)) {
              const oldFile = oldTree.read(file.path).toString()
              const targetFile = tree.read(file.path).toString()
              const futureFile = file.content.toString()

              mergeFiles(targetFile, oldFile, futureFile)
            }

            tree.overwrite(file.path, file.content)

            return null
          }

          return file
        })

        // TODO: WILL ADD REMOVE LATER ON, it is bit harder than anticipated
        // (): void => oldTree.visit((path) => {

        //   log.error(path)
        // })

        // forEach((file) => {

        //   if (oldTree?.exists(file.path)) {
        //     // if the old tree has file and new tree doesnt have it
        //     log.error(`Should delete file: "${file.path}"`)

        //     tree.delete(file.path)

        //     return null

        //   }

        //   return file
        // })

      ])
    )
  }
}

export function mergeFiles (targetFile: string, oldFile: string, futureFile: string) {
  let differences = diff.diffLines(oldFile, futureFile)

  let buffer = differences.reduce((o, difference) => {
    if (!difference.added && !difference.removed) {
      o += difference.value
    } else if (difference.added) {
      o += difference.value
    }
    return o
  }, '')

  differences = diff.diffLines(targetFile, buffer)

  buffer = differences.reduce((o, difference) => {
    if (!difference.added && !difference.removed) {
      o += difference.value
    } else if (difference.added) {
      o += difference.value
    }
    return o
  }, '')

  console.log(buffer)
}
