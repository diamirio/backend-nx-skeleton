import { join } from 'node:path'
import type { GeneratorCallback, Tree } from '@nx/devkit'
import { formatFiles, getProjects, readNxJson, updateJson } from '@nx/devkit'
import { output } from '@nx/workspace'

import { DatabaseOrm } from '../../constant'
import { addPackageScripts, selectProjectByAutocomplete } from '../../utils'
import type { DatabaseTargetGeneratorSchema } from './schema'

export default async function databaseTargetGenerator(
  tree: Tree,
  options: DatabaseTargetGeneratorSchema
): Promise<GeneratorCallback> {
  const orm = (readNxJson(tree) as any)?.integration?.orm?.database

  if (!orm || orm === 'none') {
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

  options.project ??= await selectProjectByAutocomplete(
    applications,
    'Please select the project to setup the migration for:'
  )

  if (!options.project) {
    output.error({ title: '[Migration-Target] No project selected' })
    return
  }

  const project = projects.get(options.project)

  if (!project) {
    output.error({ title: `[Migration-Target] Invalid project "${options.project}"` })

    return
  }

  const migrationScripts: Record<string, string> = {
    'migration:run': `nx migration -c run ${project.name}`,
    'migration:rollback': `nx migration -c rollback ${project.name}`,
    'migration:create': `nx migration -c create ${project.name} --name`
  }

  if (orm === DatabaseOrm.TYPEORM) {
    migrationScripts['migration:generate'] = `nx migration -c generate ${project.name} --name`
  }

  addPackageScripts(tree, 'package.json', migrationScripts)

  updateJson(tree, join(project.root, 'project.json'), (content) => {
    if (orm === DatabaseOrm.TYPEORM) {
      content.targets = {
        ...(content.targets ?? {}),
        migration: {
          executor: '@diamir/nx-executors:run',
          options: {
            tsNode: true,
            env: {
              // biome-ignore-start lint/style/useNamingConvention: env-var
              TYPEORM_SOURCE: '../../libs/database/src',
              TYPEORM_DATASOURCE: 'database/orm.config.ts',
              TYPEORM_MIGRATION: 'migration'
              // biome-ignore-end lint/style/useNamingConvention: env-var
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
              command:
                'typeorm migration:generate -d=$TYPEORM_SOURCE/$TYPEORM_DATASOURCE $TYPEORM_SOURCE/$TYPEORM_MIGRATION/{args.name}'
            }
          }
        }
      }
    } else if (orm === DatabaseOrm.MONGOOSE) {
      content.targets = {
        ...(content.targets ?? {}),
        migration: {
          executor: '@diamir/nx-executors:run',
          options: {
            tsNode: true,
            env: {
              // biome-ignore lint/style/useNamingConvention: env-var
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
      ...(content.targets ?? {}),
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
