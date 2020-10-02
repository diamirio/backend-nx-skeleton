import { apply, forEach, mergeWith, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import * as diff from 'diff'
import { createPrompt } from 'listr2'
import { dirname } from 'path'
import { Observable } from 'rxjs'

import { Logger } from '@utils/logger'

// FIXME: branchandmerge bug: https://github.com/angular/angular-cli/issues/11337A
export async function applyOverwriteWithDiff (source: Source, oldSource: Source | true, context: SchematicContext): Promise<Rule> {
  const log = new Logger(context)

  // generate the old tree without aplying something
  let oldTree: Tree

  const properties = {
    historical: typeof oldSource !== 'boolean'
  }

  if (typeof oldSource === 'boolean') {
    oldTree = await ((source(context) as unknown) as Observable<Tree>).toPromise()
  } else if (oldSource) {
    try {
      oldTree = await ((oldSource(context) as unknown) as Observable<Tree>).toPromise()
      log.warn('Prior configuration successfully recovered. Will run in diff-patch mode.')
      // eslint-disable-next-line no-empty
    } catch {}
  }

  // angular is not enough for this, need a hacky solution to track the files, because some of them we overwrite directly
  let fileChanges: string[] = []
  let filesToRemove: string[] = []
  let filesToKeep: string[] = []

  return (tree: Tree): Rule => {
    return mergeWith(
      apply(source, [
        forEach((file) => {
          if (tree.exists(file.path)) {
            let buffer = file.content

            if (oldTree?.exists(file.path)) {
              // check if this file is part of old application
              const oldFile = oldTree.read(file.path).toString()
              const currentFile = tree.read(file.path).toString()
              const newFile = file.content.toString()

              const mergedFiles = mergeFiles(file.path, currentFile, oldFile, newFile, log, { historical: properties.historical })

              if (typeof mergedFiles === 'string') {
                buffer = Buffer.from(mergedFiles, 'utf-8')

                tree.overwrite(file.path, buffer)
              } else {
                log.error(`Can not merge file: "${file.path}" -> "${file.path}.old"`)

                tree.rename(file.path, `${file.path}.old`)

                tree.create(file.path, buffer)
              }
            } else {
              // file is not part of the old setup but still exists
              log.error(`File with same name exists: "${file.path}" -> "${file.path}.old"`)

              // move file
              tree.rename(file.path, `${file.path}.old`)

              // create file
              tree.create(file.path, buffer)
            }

            // add this to file changes, return null since we did the operation directly
            fileChanges = [ ...fileChanges, file.path ]
            return null
          }

          // vanilla mode
          fileChanges = [ ...fileChanges, file.path ]
          return file
        }),

        // compare current and old configuration to get not needed files
        (): void => {
          oldTree?.visit((path) => {
            // if we dont overwrite the file with filechanges we do not need it, but it exists in tree which is the current host sysstem
            if (tree.exists(path) && !fileChanges.includes(path)) {
              filesToRemove = [ ...filesToRemove, path ]
            }
          })
        },

        // ask user if he/she wants to keep files that are not needed anymore
        async (): Promise<void> => {
          if (filesToRemove.length > 0) {
            try {
              filesToKeep = await createPrompt.bind(this)(
                {
                  type: 'MultiSelect',
                  message: 'These files are found to be unnecassary by comparing prior configuration to new configuration. Select the ones to keep.',
                  choices: filesToRemove
                },
                { error: false }
              )
            } catch {
              log.error('Cancelled prompt.')
              process.exit(127)
            }
          }
        },

        // delete not needed files from changing setup
        async (): Promise<void> => {
          if (filesToRemove.length > 0) {
            // get which files to remove
            filesToRemove = filesToRemove.reduce((o, val) => {
              // angular normalizes even path arrays defined outside!
              o = [ ...o, (val as any).path ]
              return o
            }, [])

            // remove that file
            await Promise.all(
              filesToRemove.map((file) => {
                if (!filesToKeep.includes(file)) {
                  log.debug(`Deleting not-needed file: "${file}"`)
                  tree.delete(file)
                } else {
                  log.debug(`Keeping not-needed file: "${file}"`)
                }
              })
            )
          }
        },

        // delete empty directories after changes
        async (): Promise<void> => {
          if (filesToRemove.length > 0) {
            // get all directory names of files to remove
            const directories = filesToRemove.map((path) => dirname(path)).filter((item, index, array) => array.indexOf(item) === index)

            // check and delete empty directories
            await Promise.all(
              directories.map(async (directory) => {
                if (tree.getDir(directory)?.subfiles?.length === 0 && !(tree.getDir(directory)?.subdirs?.length > 0)) {
                  log.debug(`Deleting not-needed empty directory: "${directory}"`)
                  tree.delete(directory)
                } else if (tree.getDir(directory)?.subdirs?.length > 0) {
                  // dont delete if has subdirectories
                  log.debug(`Still has subdirectories: "${directory}"`)
                }
              })
            )
          }
        }
      ])
    )
  }
}

export function mergeFiles (name: string, currentFile: string, oldFile: string, newFile: string, log: Logger, options?: { historical: boolean }): string | boolean {
  // create difference-patch
  let patch: string
  if (options?.historical) {
    // triple patch mode, if you know the history of the file
    patch = diff.createPatch(name, oldFile, newFile, '', '', { context: 1 })
  } else {
    // double patch mode if you dont know the history of the file
    patch = diff.createPatch(name, newFile, currentFile, '', '', { context: 1 })
  }

  log.debug(patch)

  if (options?.historical) {
    // triple patch mode, if you know the history of the file
    return diff.applyPatch(currentFile, patch)
  } else {
    // double patch mode if you dont know the history of the file
    return diff.applyPatch(newFile, patch)
  }
}
