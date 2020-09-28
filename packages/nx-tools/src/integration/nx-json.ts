import { Rule } from '@angular-devkit/schematics'
import { readNxJson, updateJsonInTree } from '@nrwl/workspace'
import merge from 'deepmerge'

import { EnrichedNxJson } from '@interfaces/nx-json.interface'

export function updateNxIntegration<T> (name: string, options: T): Rule {
  return updateJsonInTree('nx.json', (json) => {
    let nxJson = {} as T

    // get the current config or create a new one
    if (!json?.projects?.[name]?.integration) {
      json.projects[name].integration = {} as T
    } else {
      nxJson = json.projects[name].integration
    }

    // write it back
    json.projects[name].integration = merge(nxJson, options, {
      arrayMerge: (target, source) => [ ...target, ...source ].filter((item, index, array) => array.indexOf(item) === index)
    })

    return json
  })
}

export function readNxIntegration<T> (name: string): T {
  return (readNxJson() as EnrichedNxJson<T>).projects?.[name]?.integration
}
