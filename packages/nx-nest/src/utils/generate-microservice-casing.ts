import { generateNameCases } from '@webundsoehne/nx-tools'

import { GeneratedMicroserviceCasing } from './generate-microservice-casing.interface'

export function generateMicroserviceCasing (name: string): GeneratedMicroserviceCasing {
  const casing = generateNameCases(name)

  return {
    name,
    names: {
      queue: `${casing.upper}_QUEUE`,
      client: `${casing.camel}Client`,
      file: `${casing.kebab}-microservice`,
      pattern: `${casing.pascal}MessagePattern`,
      interface: `${casing.pascal}Message`
    },
    casing
  }
}
