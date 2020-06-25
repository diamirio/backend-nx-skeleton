import { normalize } from '@angular-devkit/core'
import { Tree } from '@angular-devkit/schematics'
import { toFileName } from '@nrwl/workspace'
import { appsDir } from '@nrwl/workspace/src/utils/ast-utils'
import { Listr } from 'listr2'

import { parseArguments } from './normalize-options.helper'
import { AvailableComponents, AvailableDBTypes, AvailableServerTypes, NormalizedSchema, Schema } from '@application/schema'

export async function normalizeOptions (
  host: Tree,
  options: Schema
): Promise<NormalizedSchema> {
  return new Listr<NormalizedSchema>([
    // assign options to parsed schema
    {
      task: async (ctx): Promise<void> => {
        await Promise.all([ 'name', 'tests', 'linter' ].map((item) => {
          ctx[item] = options[item]
        }))

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

    // set project root directory
    {
      title: 'Setting project root directory.',
      task: (ctx, task): void => {
        ctx.root = normalize(`${appsDir(host)}/${ctx.directory}`)

        task.title = `Project root directory is set as "${ctx.root}".`
      }
    },

    // select server functionality
    {
      task: async (ctx, task): Promise<void> => {
        const choices = [
          { name: 'server', message: 'Server' },
          { name: 'bgtask', message: 'Scheduler' },
          { name: 'command', message: 'Command' }
        ]

        // select the base components
        if (!options.components) {

          // when options are not passed as an option to the command
          ctx.components = await task.prompt<AvailableComponents[]>({
            type: 'MultiSelect',
            message: 'Please select which components you want to include.',
            choices
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
        const choices = [
          { name: 'restful', message: 'RESTFUL' },
          { name: 'graphql', message: 'GraphQL' }
        ]

        if (!options.server) {
          ctx.server = await task.prompt<AvailableServerTypes>({
            type: 'Select',
            message: 'Please select the API server type.',
            choices
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
      skip: (ctx): boolean => !ctx.components.includes('server'),
      task: async (ctx, task): Promise<void> => {
        const choices = [
          { name: 'none', message: 'None' },
          { name: 'typeorm-mysql', message: 'Typeorm - MySQL' },
          { name: 'typeorm-postgresql', message: 'Typeorm - PostgreSQL' },
          { name: 'mongoose-mongodb', message: 'Mongoose - MongoDB' }
        ]

        // there can be two selections of API servers here
        if (!options.database) {
          ctx.database = await task.prompt<AvailableDBTypes>({
            type: 'Select',
            message: 'Please select the database type.',
            choices
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
    }

  ], {
    concurrent: false
  }).run()
}
