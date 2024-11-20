import type { Tree } from '@nx/devkit'
import { generateFiles, logger, OverwriteStrategy } from '@nx/devkit'
import { prompt } from 'enquirer'
import { join } from 'node:path'
import { readJson } from 'nx/src/generators/utils/json'

import type { Database } from '../constant'
import { DatabaseOrm } from '../constant'

export default async function (tree: Tree): Promise<void> {
  if (!tree.exists('nx.json')) {
    logger.warn('No `nx.json` found, skipping migration ...')

    return
  }

  const nx = readJson(tree, 'nx.json')
  let database = nx.integration?.orm?.database

  if (!database) {
    database = (
      await prompt<{ database?: Database }>({
        type: 'autocomplete',
        name: 'database',
        message: 'Please select the used database:',
        choices: [DatabaseOrm.TYPEORM, DatabaseOrm.MONGOOSE, DatabaseOrm.NONE]
      })
    ).database
  }

  if (database && database !== DatabaseOrm.NONE) {
    generateFiles(
      tree,
      join(__dirname, `../generators/database-orm/files/${database}/src/util/migration-task`),
      'libs/database/src/util/migration-task',
      {},
      { overwriteStrategy: OverwriteStrategy.Overwrite }
    )
    generateFiles(
      tree,
      join(__dirname, `../generators/database-orm/files/${database}/src/database`),
      'libs/database/src/database',
      {},
      { overwriteStrategy: OverwriteStrategy.Overwrite }
    )

    for (const file of tree.listChanges() ?? []) {
      if (file.path.endsWith('.ejs')) {
        tree.rename(file.path, file.path.replace('.ejs', ''))
      }
    }
  }
}
