import { Tree } from '@angular-devkit/schematics'
import { AvailableSchemaModes, PrettyNamesDefault } from '@constants'
import { ListrTask } from 'listr2'

import { mapPromptChoices } from '../schematics/parse-arguments'
import { readWorkspaceProjects } from '@integration'
import { EnrichedProjectConfiguration } from '@interfaces'
import {
  BaseNormalizedSchema,
  BaseNormalizedSchemaWithParent,
  BaseSchema,
  BaseSchemaModes,
  BaseSchemaWithParentAndDestination,
  BaseSchemaWithParent,
  SchemaPriorConfiguration,
  BaseSchemaParent,
  SelectParentApplicationFn
} from '@interfaces/base-schemas.interface'

export function normalizeNameTask<Ctx extends BaseSchema> (): ListrTask<Ctx>[] {
  return [
    {
      skip: (ctx): boolean => !!ctx.name,
      task: async (ctx, task): Promise<void> => {
        ctx.name = await task.prompt({
          type: 'Input',
          message: 'Please give a name.'
        })

        task.title = `Name: ${ctx.name}`
      }
    }
  ]
}

export function normalizeNameWithParentAndDestinationTask<Ctx extends BaseSchemaWithParentAndDestination, Integration extends Record<string, any>> (
  host: Tree,
  select?: (name: string, project: EnrichedProjectConfiguration<Integration>) => boolean
): ListrTask<Ctx>[] {
  return [
    ...normalizeParentApplicationTask<Ctx, Integration>(host, select),

    {
      skip: (ctx): boolean => !!ctx.destination,
      task: async (ctx, task): Promise<void> => {
        ctx.destination = await task.prompt({
          type: 'Input',
          message: 'Please state a destination.'
        })

        task.title = `Destination: ${ctx.destination}`
      }
    }
  ]
}

export function normalizeNameWithApplicationModeTask<
  Ctx extends BaseSchema & BaseNormalizedSchema & BaseSchemaModes & SchemaPriorConfiguration<Integration>,
  Integration extends Record<string, any>
> (host: Tree, select?: (name: string, project: EnrichedProjectConfiguration<Integration>) => boolean): ListrTask<Ctx>[] {
  return [
    {
      skip: (ctx): boolean => !!ctx.mode,
      task: async (ctx, task): Promise<void> => {
        const choices = mapPromptChoices<AvailableSchemaModes>(AvailableSchemaModes, PrettyNamesDefault)

        ctx.mode = await task.prompt({
          type: 'Select',
          message: 'Select the generator mode.',
          choices
        })

        task.title = `Generator running in ${ctx.mode} mode.`
      }
    },

    // select application name
    {
      skip: (ctx): boolean => !(ctx.mode === AvailableSchemaModes.CREATE && !ctx.name),
      task: async (ctx, task): Promise<void> => {
        ctx.name = await task.prompt({
          type: 'Input',
          message: 'Please give a name.'
        })

        task.title = `Name: ${ctx.name}`
      }
    },

    {
      skip: (ctx): boolean => !(ctx.mode === AvailableSchemaModes.MODIFY && !ctx.name),
      task: async (ctx, task): Promise<void> => {
        const projects = readWorkspaceProjects<Integration>(host)

        const choices = Object.entries(projects)
          .filter(([ name, project ]) => typeof select === 'function' ? select(name, project) : Boolean)
          .map(([ name ]) => name)

        if (choices.length === 0) {
          throw new Error('No project has been found in the workspace.')
        }

        ctx.name = await task.prompt({
          type: 'AutoComplete',
          message: 'Please select an existing application.',
          choices
        })

        task.title = `Name: ${ctx.name}`
      }
    }
  ]
}

export function normalizeNameWithParentApplicationTask<Ctx extends BaseSchemaWithParent & BaseNormalizedSchemaWithParent<Integration>, Integration extends Record<string, any>> (
  host: Tree,
  select?: SelectParentApplicationFn<Integration>
): ListrTask<Ctx>[] {
  return [
    ...normalizeParentApplicationTask<Ctx, Integration>(host, select),

    // prompt for generator name
    {
      skip: (ctx): boolean => !!ctx.name,
      task: async (ctx, task): Promise<void> => {
        ctx.name = await task.prompt({
          type: 'Input',
          message: 'Please give a name.'
        })

        task.title = `Name: ${ctx.name}`
      }
    }
  ]
}

export function normalizeParentApplicationTask<Ctx extends BaseSchemaParent, Integration extends Record<string, any>> (
  host: Tree,
  select?: SelectParentApplicationFn<Integration>
): ListrTask<Ctx>[] {
  return [
    // prompt parent application
    {
      skip: (ctx): boolean => !!ctx.parent,
      task: async (ctx, task): Promise<void> => {
        const projects = readWorkspaceProjects<Integration>(host)

        const choices = Object.entries(projects)
          .filter(([ name, project ]) => typeof select === 'function' ? select(name, project) : Boolean)
          .map(([ name ]) => name)

        if (choices.length === 0) {
          throw new Error('No project has been found in the workspace.')
        }

        ctx.parent = await task.prompt({
          type: 'AutoComplete',
          message: 'Please select an existing application as the parent.',
          choices
        })

        task.title = `Parent application: ${ctx.parent}`
      }
    }
  ]
}
