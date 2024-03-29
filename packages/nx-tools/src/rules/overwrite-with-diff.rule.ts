import type { FileEntry, Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics'
import { apply, branchAndMerge, forEach, MergeStrategy, mergeWith } from '@angular-devkit/schematics'
import type { LazyFileEntry } from '@angular-devkit/schematics/src/tree/entry'
import * as diff from 'diff'
import { Listr } from 'listr2'
import { EOL } from 'os'
import { dirname } from 'path'
import type { Observable } from 'rxjs'
import { firstValueFrom } from 'rxjs'

import { isVerbose, ListrLogger, Logger } from '@utils'

// FIXME: branchandmerge bug: https://github.com/angular/angular-cli/issues/11337A
/**
 * Given two sources, this will try to diff-merge prior and new configuration and apply it to current configuration.
 *
 * If given one source, it will only apply what is missing from the current file and does not delete anything.
 *
 * NX have a problem with its internal overwriting data mechanism so it is generated this way.
 * @param source
 * @param oldSource
 * @param context
 */
export function applyOverwriteWithDiff (source: Source, oldSource: Source | void, context: SchematicContext): Rule {
  const log = new Logger(context)

  // generate the old tree without applying something
  let oldTree: Tree

  // angular is not enough for this, need a hacky solution to track the files, because some of them we overwrite directly
  let fileChanges: string[] = []
  let filesToRemove: string[] = []
  let filesToKeep: string[] = []

  return (host: Tree): Rule => {
    return branchAndMerge(
      mergeWith(
        apply(source, [
          // recover old tree first
          async (): Promise<void> => {
            if (oldSource) {
              try {
                oldTree = await firstValueFrom<Tree>(oldSource(context) as unknown as Observable<Tree>)

                log.warn('Prior configuration successfully recovered. Will run in diff-patch mode.')
                // eslint-disable-next-line no-empty
              } catch {
                log.debug('Old source tree can not be parsed.')
              }
            } else {
              log.debug('Old source tree is not available.')
            }
          },

          // merge files for each file
          forEach((file) => {
            if (host.exists(file.path)) {
              const currentFile = host.read(file.path).toString()
              const newFile = file.content.toString()

              if (oldTree?.exists(file.path)) {
                // check if this file is part of old application
                const oldFile = oldTree.read(file.path).toString()

                mergeFiles(host, file, tripleFileMerge(file.path, currentFile, oldFile, newFile, log), log)
                log.debug('Performing triple merge on: %s', file.path)
              } else {
                mergeFiles(host, file, doubleFileMerge(file.path, newFile, currentFile, log), log)
                log.debug('Performing double merge on: %s', file.path)
              }

              // add this to file changes, return null since we did the operation directly
              fileChanges = [...fileChanges, file.path]

              return file
            }

            // vanilla mode
            fileChanges = [...fileChanges, file.path]

            return file
          }),

          // compare current and old configuration to get not needed files
          (tree): void => {
            oldTree?.visit((path) => {
              // if we dont overwrite the file with filechanges we do not need it, but it exists in tree which is the current host sysstem
              if (tree.exists(path) && !fileChanges.includes(path)) {
                filesToRemove = [...filesToRemove, path]
                log.debug('File seems to be no longer needed: %s', path)
              }
            })
          },

          // ask user if he/she wants to keep files that are not needed anymore
          async (): Promise<void> => {
            if (filesToRemove.length > 0) {
              filesToKeep = (
                await new Listr(
                  [
                    {
                      task: async (ctx, task): Promise<void> => {
                        ctx.keep = await task.prompt({
                          type: 'MultiSelect',
                          message: 'These files are found to be unnecessary by comparing prior configuration to new configuration. Select the ones to keep.',
                          choices: filesToRemove
                        })
                      }
                    }
                  ],
                  { nonTTYRendererOptions: { logger: ListrLogger, options: [context] }, rendererFallback: isVerbose() }
                ).run()
              ).keep
            }
          },

          // delete not needed files from changing setup
          async (tree): Promise<void> => {
            if (filesToRemove.length > 0) {
              // get which files to remove
              filesToRemove = filesToRemove.reduce((o, val) => {
                // angular normalizes even path arrays defined outside!
                o = [...o, (val as any).path]

                return o
              }, [])

              // remove that file
              await Promise.all(
                filesToRemove.map((file) => {
                  if (!filesToKeep.includes(file)) {
                    log.debug('Deleting not-needed file: "%s"', file)
                    tree.delete(file)
                  } else {
                    log.debug('Keeping not-needed file: "%s"', file)
                  }
                })
              )
            }
          },

          // delete empty directories after changes
          async (tree): Promise<void> => {
            if (filesToRemove.length > 0) {
              // get all directory names of files to remove
              const directories = filesToRemove.map((path) => dirname(path)).filter((item, index, array) => array.indexOf(item) === index)

              // check and delete empty directories
              await Promise.all(
                directories.map(async (directory) => {
                  if (tree.getDir(directory)?.subfiles?.length === 0 && !(tree.getDir(directory)?.subdirs?.length > 0)) {
                    log.debug('Deleting not-needed empty directory: "%s"', directory)
                    tree.delete(directory)
                  } else if (tree.getDir(directory)?.subdirs?.length > 0) {
                    // dont delete if has subdirectories
                    log.debug('Still has subdirectories: "%s"', directory)
                  }
                })
              )
            }
          }
        ]),
        MergeStrategy.Overwrite
      )
    )
  }
}

const patchOptions: diff.PatchOptions = {
  context: 2
}

/**
 * Triple file merge will compare old with new file and apply the changes to the current file.
 * @param name
 * @param currentFile
 * @param oldFile
 * @param newFile
 * @param log
 */
export function tripleFileMerge (name: string, currentFile: string, oldFile: string, newFile: string, log: Logger): string | boolean {
  let buffer: string
  // create difference-patch
  const patch: string = diff.createPatch(name, oldFile, newFile, '', '', patchOptions)

  try {
    buffer = diff.applyPatch(currentFile, patch, { fuzzFactor: 1 })
  } catch (e) {
    log.debug('Error while triple-merging: %s', e)

    return false
  }

  // empty patches has 5 lines, so no need to show them
  if (patch.split(EOL).length > 5) {
    log.debug(patch)
  }

  return buffer
}

/**
 * Double file merge only adds changes on the new file to the current file. No delete operation will be performed.
 * @param name
 * @param newFile
 * @param currentFile
 * @param log
 */
export function doubleFileMerge (name: string, newFile: string, currentFile: string, log: Logger): string | boolean {
  let buffer: string
  const newToCurrentPatch = selectivePatch(diff.structuredPatch(name, name, currentFile, newFile, '', '', patchOptions), 'add')

  try {
    buffer = diff.applyPatch(currentFile, newToCurrentPatch)
  } catch (e) {
    log.debug('Error while double-merging: %s', e)

    return false
  }
  // const currentToNewPatch = diff.structuredPatch(name, name, file, currentFile, '', '', { context })
  // console.log('currentToNewPatch', currentToNewPatch.hunks)
  // try {
  //   file = diff.applyPatch(newFile, currentToNewPatch)
  // } catch (e) {
  //   log.debug(e)
  //   return false
  // }

  return buffer
}

/**
 * Selectively applies patches where you can define to only add or remove items.
 * @param patch
 * @param select
 */
export function selectivePatch (patch: diff.ParsedDiff, select: 'add' | 'remove'): diff.ParsedDiff {
  return {
    ...patch,
    hunks: [
      ...patch.hunks.map((p) => {
        // reduce instead of map because, i am trying some operations
        // let linechanges = 0
        const lines = p.lines.reduce((o, l) => {
          if (select === 'add') {
            // linechanges--
            return [...o, replaceFirstChars(l, '-', ' ')]
          } else if (select === 'remove') {
            // linechanges++
            return [...o, replaceFirstChars(l, '+', ' ')]
          }
        }, [])

        return {
          ...p,
          linedelimiters: p.lines.map(() => EOL),
          lines
        }
      })
    ]
  }
}

/**
 * Required for parsing selective patchs in a string format.
 * @param str
 * @param from
 * @param to
 */
function replaceFirstChars (str: string, from: string, to: string): string {
  if (str.substring(0, from.length) === from) {
    return to + str.substring(from.length)
  } else {
    return str
  }
}

/**
 * Merges files the common part.
 * @param host
 * @param file
 * @param mergedFiles
 * @param log
 */
export function mergeFiles (host: Tree, file: FileEntry | LazyFileEntry, mergedFiles: string | boolean, log: Logger): void {
  let buffer = file.content

  if (typeof mergedFiles === 'string') {
    buffer = Buffer.from(mergedFiles, 'utf-8')

    host.overwrite(file.path, buffer)
  } else {
    log.error('Can not merge file: "%s" -> "%s.old"', file.path, file.path)

    createFileBackup(host, file, log)

    host.create(file.path, buffer)
  }
}

/**
 * Creates a file backup in tree.
 * @param host
 * @param file
 * @param log
 */
export function createFileBackup (host: Tree, file: FileEntry | LazyFileEntry, log: Logger): void {
  const backupFilePath = `${file.path}.old`

  log.error('Can not merge file creating backup: "%s" -> "%s"', file.path, backupFilePath)

  if (host.exists(backupFilePath)) {
    host.delete(backupFilePath)
  }

  host.rename(file.path, backupFilePath)
}
