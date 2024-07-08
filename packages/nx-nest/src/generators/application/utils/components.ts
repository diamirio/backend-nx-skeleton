import { Component } from '../../../constant/application'

interface ComponentMetadata {
  applicationConstants: string
  applicationImports: string
  applicationBootstrap: string
  applicationCase: string
  file: string
}

const metaDataMap = {
  [Component.COMMAND]: {
    service: 'cli',
    constant: 'COMMAND',
    name: 'Command',
    file: 'command'
  },
  [Component.MICROSERVICE]: {
    service: 'microservice_server',
    constant: 'MICROSERVICE_SERVER',
    name: 'Microservice',
    file: 'microservice'
  },
  [Component.SERVER]: {
    service: 'server',
    constant: 'SERVER',
    name: 'Server',
    file: 'server'
  },
  [Component.BG_TASK]: {
    service: 'bgtask',
    constant: 'TASK',
    name: 'Task',
    file: 'task'
  }
}

function getComponentStrings (component: Component): ComponentMetadata {
  const { service, name, constant, file } = metaDataMap[component]

  return {
    applicationConstants: `${constant} = '${service}'`,
    applicationImports: `import { createApplication as create${name}Application } from './${file ?? name.toLowerCase()}/init'`,
    applicationBootstrap: `return create${name}Application()`,
    applicationCase: `case Service.${constant}: return create${name}Application()`,
    file
  }
}

export function getComponentMetadata (components: Component[]): ComponentMetadata[] {
  return components.filter((c) => !!metaDataMap[c]).map(getComponentStrings)
}
