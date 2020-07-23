import { normalize } from '@angular-devkit/core'
import { Tree, SchematicContext } from '@angular-devkit/schematics'
import { readNxJson, toFileName } from '@nrwl/workspace'
import { appsDir, readJsonInTree } from '@nrwl/workspace/src/utils/ast-utils'
import { directoryExists } from '@nrwl/workspace/src/utils/fileutils'
import { ConvertToPromptType, parseArguments } from '@webundsoehne/nx-tools'
import { Listr } from 'listr2'

import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, NormalizedSchema, Schema } from '@src/schematics/application/main.interface'

export async function normalizeOptions (host: Tree, context: SchematicContext, options: Schema): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>(
    [
      // assign options to parsed schema
      {
        task: async (ctx): Promise<void> => {
          await Promise.all(
            [ 'name', 'verbose', 'tests', 'linter' ].map((item) => {
              ctx[item] = options[item]
            })
          )
        }
      },

      // decide the application root directory
      {
        task: (ctx): void => {
          if (options.directory) {
            ctx.directory = `${toFileName(options.directory)}/${toFileName(options.name)}`
          } else {
            ctx.directory = toFileName(options.name)
          }
        }
      },

      // remove unwanted charachters from directory name
      {
        title: 'Normalizing project name.',
        task: (ctx, task): void => {
          ctx.name = ctx.directory.replace(new RegExp('/', 'g'), '-')

          task.title = `Project name is set as "${ctx.name}".`
        }
      },

      // normalize package json scope
      {
        title: 'Normalizing package.json project name.',
        task: (ctx, task): void => {
          ctx.packageName = `@${readNxJson().npmScope}/${ctx.name}`

          task.title = `Project package name set as "${ctx.packageName}".`
        }
      },

      // set project root directory
      {
        title: 'Setting project root directory.',
        task: (ctx, task): void => {
          ctx.root = normalize(`${appsDir(host)}/${ctx.directory}`)

          task.title = `Project root directory is set as "${ctx.root}".`
        }
      },

      // check for prior configuration
      {
        title: 'Checking if the application is configured before.',
        task: (ctx, task): void => {
          if (directoryExists(ctx.root)) {
            task.output = `Project root directory is not empty at: "${ctx.root}"`

            task.title = 'Looking for prior application configuration in "nx.json".'

            const nxJson = readJsonInTree(host, 'nx.json')

            const thisProject = nxJson.projects?.[ctx.name]?.integration
            if (thisProject) {
              ctx.priorConfiguration = {
                components: thisProject?.components,
                server: thisProject.setup?.server,
                database: thisProject.setup?.database
              }
              task.title = 'Prior configuration successfully found in "nx.json".'
            } else {
              throw new Error('Can not read prior configuration from "nx.json".')
            }
          } else {
            task.title = 'This is the initial configuration of the package.'
          }
        },
        options: {
          persistentOutput: true,
          bottomBar: false
        }
      },

      // select server functionality
      {
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableComponents> = [
            { name: 'server', message: 'Server' },
            { name: 'bgtask', message: 'Scheduler' },
            { name: 'command', message: 'Command' },
            { name: 'microservice', message: 'Microservice' }
          ]

          // select the base components
          if (!options.components) {
            task.output = JSON.stringify(ctx.priorConfiguration)

            // when options are not passed as an option to the command
            ctx.components = await task.prompt<AvailableComponents[]>({
              type: 'MultiSelect',
              message: 'Please select which components you want to include.',
              choices: choices as any,
              validate: (val) => {
                if (val?.length > 0) {
                  return true
                } else {
                  return 'At least one component must be included.'
                }
              },
              initial: getInitialFromPriorConfiguration(ctx, 'components', choices)
            })
          } else {
            // when options are passed via cli
            ctx.components = parseArguments<AvailableComponents[]>(task, options.components, choices, { required: true })
          }

          task.title = `Server components selected: ${ctx.components}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // backend server types
      {
        skip: (ctx): boolean => !ctx.components.includes('server'),
        task: async (ctx, task): Promise<void> => {
          // there can be two selections of API servers here
          const choices: ConvertToPromptType<AvailableServerTypes> = [
            { name: 'restful', message: 'RESTFUL' },
            { name: 'graphql', message: 'GraphQL' }
          ]

          if (!options.server) {
            ctx.server = await task.prompt<AvailableServerTypes>({
              type: 'Select',
              message: 'Please select the API server type.',
              choices: choices as any,
              initial: getInitialFromPriorConfiguration(ctx, 'server', choices)
            })
          } else {
            // when options are passed via cli
            ctx.server = parseArguments<AvailableServerTypes>(task, options.server, choices, { required: true, single: true })
          }

          task.title = `Server type selected as: ${ctx.server}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // database options
      {
        skip: (ctx): boolean => !ctx.components.includes('server') && !ctx.components.includes('bgtask'),
        task: async (ctx, task): Promise<void> => {
          const choices: ConvertToPromptType<AvailableDBTypes> = [
            { name: 'none', message: 'None' },
            { name: 'typeorm-mysql', message: 'Typeorm - MySQL' },
            { name: 'typeorm-postgresql', message: 'Typeorm - PostgreSQL' },
            { name: 'mongoose-mongodb', message: 'Mongoose - MongoDB' }
          ]

          // there can be two selections of API servers here
          if (!options?.database) {
            ctx.database = await task.prompt<AvailableDBTypes>({
              type: 'Select',
              message: 'Please select the database type.',
              choices: choices as any,
              initial: getInitialFromPriorConfiguration(ctx, 'database', choices)
            })
          } else {
            // when options are passed via cli
            ctx.database = parseArguments<AvailableDBTypes>(task, options.database, choices, { required: true, single: true })
          }

          task.title = `Database selected as: ${ctx.database}`
        },
        options: {
          bottomBar: Infinity,
          persistentOutput: true
        }
      },

      // default database
      {
        skip: (ctx): boolean => !(!ctx.components.includes('server') && !ctx.components.includes('bgtask')),
        task: async (ctx): Promise<void> => {
          ctx.database = 'none'
        }
      }
    ],
    {
      concurrent: false,
      rendererFallback: context.debug
    }
  ).run()
}

function getInitialFromPriorConfiguration (ctx: NormalizedSchema, key: keyof NormalizedSchema['priorConfiguration'], choices: ConvertToPromptType<any>): number[] | number {
  if (key === 'components') {
    return (
      ctx.priorConfiguration?.[key]?.reduce((o, val) => {
        choices.forEach((v, i) => {
          if (v.name === val) {
            o = [ ...o, i ]
          }
        })
        return o
      }, []) ?? []
    )
  } else {
    let value = 0
    choices.forEach((val, i) => {
      if (val.name === ctx.priorConfiguration?.[key]) {
        value = i
      }
    })

    return value
  }
}
