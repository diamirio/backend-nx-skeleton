import { camelCase, constantCase, paramCase, pascalCase, snakeCase } from 'change-case'

import { GeneratedNameCases } from './generate-name-cases.interface'

export function generateNameCases (name: string): GeneratedNameCases {
  return {
    camel: camelCase(name),
    snake: snakeCase(name),
    upper: constantCase(name),
    kebab: paramCase(name),
    pascal: pascalCase(name)
  }
}
