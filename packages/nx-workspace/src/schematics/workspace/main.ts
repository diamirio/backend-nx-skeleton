import { strings } from '@angular-devkit/core'
import {
  apply, branchAndMerge, chain, mergeWith, noop, Rule, SchematicContext, template, Tree, url
} from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'
import { readFileSync } from 'fs'
import { join as pathJoin } from 'path'

import { Schema } from './main.interface'

export const DEFAULT_NRWL_PRETTIER_CONFIG = {
  singleQuote: true
}

const decorateAngularClI = (host: Tree): void => {
  const decorateCli = readFileSync(pathJoin(__dirname as any, '..', 'utils', 'decorate-angular-cli.js__tmpl__')).toString()
  host.create('decorate-angular-cli.js', decorateCli)
}

function setWorkspaceLayoutProperties (options: Schema): Rule {
  return updateJsonInTree('nx.json', (json) => {
    if (options.layout === 'packages') {
      json.workspaceLayout = {
        appsDir: 'packages',
        libsDir: 'packages'
      }
    }
    return json
  })
}

function createAppsAndLibsFolders (options: Schema) {
  return (host: Tree): void => {
    if (options.layout === 'packages') {
      host.create('packages/.gitkeep', '')
    } else {
      host.create('apps/.gitkeep', '')
      host.create('libs/.gitkeep', '')
    }
  }
}

export default function (options: Schema): Rule {
  if (!options.name) {
    throw new Error('Invalid options, "name" is required.')
  }

  return (host: Tree, context: SchematicContext): any => {
    const npmScope = options.npmScope ? options.npmScope : options.name
    const templateSource = apply(url('./files'), [
      template({
        utils: strings,
        workspaceFile: options.cli === 'angular' ? 'angular' : 'workspace',
        cliCommand: options.cli === 'angular' ? 'ng' : 'nx',
        nxCli: false,
        ...options,
        npmScope,
        defaultNrwlPrettierConfig: JSON.stringify(DEFAULT_NRWL_PRETTIER_CONFIG, null, 2)
      })
    ])

    return chain([
      branchAndMerge(
        chain([ mergeWith(templateSource), options.cli === 'angular' ? decorateAngularClI : noop(), setWorkspaceLayoutProperties(options), createAppsAndLibsFolders(options) ])
      )
    ])(host, context)
  }
}
