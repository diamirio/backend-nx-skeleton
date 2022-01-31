import type { GeneratedMicroserviceCasing } from './generate-microservice-casing.interface'
import { generateNameCases } from '@webundsoehne/nx-tools'

export function generateMicroserviceCasing (name: string): GeneratedMicroserviceCasing {
  const casing = generateNameCases(name)

  return {
    name,
    names: {
      file: `${casing.kebab}-microservice`,
      queue: `${casing.upper}_QUEUE`,
      pattern: `${casing.pascal}Pattern`,
      interface: `${casing.pascal}Message`,
      default: `${casing.upper}_DEFAULT`
    },
    casing
  }
}
