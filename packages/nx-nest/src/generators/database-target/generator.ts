import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, getProjects, readNxJson, updateJson } from '@nx/devkit'
import { output } from '@nx/workspace'
import { prompt } from 'enquirer'
import { join } from 'node:path'

import { DatabaseOrm } from '../../constant'
import type { DatabaseTargetGeneratorSchema } from './schema'

export default async function databaseTargetGenerator (tree: Tree, options: DatabaseTargetGeneratorSchema): Promise<GeneratorCallback> {
  const orm = (readNxJson(tree) as any)?.integration?.orm?.database

  if (!orm || orm === 'none') {
    // @todo: remove legacy 'none'
    output.error({ title: '[Migration-Target] Requires database-orm to be set up' })

    return
  }

  const applications = []
  const projects = getProjects(tree)

  for (const project of projects.values()) {
    if (project.projectType === 'application') {
      applications.push({ name: project.name, value: project.name })
    }
  }

  if (!applications.length) {
    output.error({ title: '[Migration-Target] No projects found' })

    return
  }

  options.project ??= (
    await prompt<{ project: string }>({
      type: 'autocomplete',
      name: 'project',
      message: 'Please select the project to setup the migration for:',
      choices: applications
    })
  ).project

  const project = projects.get(options.project)

  if (!project) {
    output.error({ title: `[Migration-Target] Invalid project "${options.project}"` })

    return
  }

  updateJson(tree, 'package.json', (content) => {
    content.scripts.migrate ??= `nx migration -c run ${project.name}`
    content.scripts['migrate:rollback'] ??= `nx migration -c rollback ${project.name}`
    content.scripts['migrations:create'] ??= `nx migration -c create ${project.name} --name`

    if (orm === DatabaseOrm.TYPEORM) {
      content.scripts['migrations:generate'] ??= `nx migration -c generate ${project.name} --name`
    }

    return content
  })

  updateJson(tree, join(project.root, 'project.json'), (content) => {
    if (orm === DatabaseOrm.TYPEORM) {
      content.targets = {
        ...content.targets ?? {},
        migration: {
          executor: '@webundsoehne/nx-executors:run',
          options: {
            tsNode: true,
            env: {
              TYPEORM_SOURCE: '../../libs/database/src',
              TYPEORM_DATASOURCE: 'database/orm.config.ts',
              TYPEORM_MIGRATION: 'migration'
            }
          },
          configurations: {
            show: {
              command: 'typeorm migration:show -d=$TYPEORM_SOURCE/$TYPEORM_DATASOURCE'
            },
            run: {
              command: 'typeorm migration:run -d=$TYPEORM_SOURCE/$TYPEORM_DATASOURCE'
            },
            rollback: {
              command: 'typeorm migration:revert -d=$TYPEORM_SOURCE/$TYPEORM_DATASOURCE'
            },
            create: {
              command: 'typeorm migration:create $TYPEORM_SOURCE/$TYPEORM_MIGRATION/{args.name}'
            },
            generate: {
              command: 'typeorm migration:generate -d=$TYPEORM_SOURCE/$TYPEORM_DATASOURCE $TYPEORM_SOURCE/$TYPEORM_MIGRATION/{args.name}'
            }
          }
        }
      }
    } else if (orm === DatabaseOrm.MONGOOSE) {
      content.targets = {
        ...content.targets ?? {},
        migration: {
          executor: '@webundsoehne/nx-executors:run',
          options: {
            tsNode: true,
            env: {
              MONGOOSE_MIGRATE_OPTIONS: '../../libs/database/src/database/migrate-options.ts'
            }
          },
          configurations: {
            run: {
              command: 'migrate-mongo up -f $MONGOOSE_MIGRATE_OPTIONS'
            },
            rollback: {
              command: 'migrate-mongo down -f $MONGOOSE_MIGRATE_OPTIONS'
            },
            create: {
              command: 'migrate-mongo create -f $MONGOOSE_MIGRATE_OPTIONS {args.name}'
            }
          }
        }
      }
    }

    content.targets = {
      ...content.targets ?? {},
      build: {
        options: {
          assets: [
            {
              glob: '*.js',
              input: 'libs/database/src/migration',
              output: 'libs/database/src/migration'
            }
          ]
        }
      }
    }

    return content
  })

  await formatFiles(tree)
}
