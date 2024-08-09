export enum Component {
  SERVER = 'server',
  COMMAND = 'command',
  BG_TASK = 'bg-task',
  MICROSERVICE = 'microservice'
}

interface ComponentMetadata {
  applicationConstants: string
  applicationImports: string
  applicationBootstrap: string
  applicationCase: string
  folder: string
}

export const componentMetaData = {
  [Component.COMMAND]: {
    service: 'cli',
    constant: 'COMMAND',
    className: 'Command',
    folder: 'command'
  },
  [Component.MICROSERVICE]: {
    service: 'microservice_server',
    constant: 'MICROSERVICE_SERVER',
    className: 'Microservice',
    folder: 'microservice'
  },
  [Component.SERVER]: {
    service: 'server',
    constant: 'SERVER',
    className: 'Server',
    folder: 'server'
  },
  [Component.BG_TASK]: {
    service: 'bgtask',
    constant: 'TASK',
    className: 'Task',
    folder: 'task'
  }
}

function getComponentStrings (component: Component): ComponentMetadata {
  const { service, className, constant, folder } = componentMetaData[component]

  return {
    applicationConstants: `${constant} = '${service}'`,
    applicationImports: `import { createApplication as create${className}Application } from './${folder}/init'`,
    applicationBootstrap: `return create${className}Application()`,
    applicationCase: `case Service.${constant}: return create${className}Application()`,
    folder
  }
}

export function getComponentMetadata (components: Component[]): ComponentMetadata[] {
  return components.filter((c) => !!componentMetaData[c]).map(getComponentStrings)
}
