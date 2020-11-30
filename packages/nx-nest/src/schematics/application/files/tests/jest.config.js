const { readFileSync } = require('fs')
const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

const TS_CONFIG_PATH = 'tests/tsconfig.json'
const SRC_PATH = 'src'

module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: join('<rootDir>', TS_CONFIG_PATH)
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(JSON.parse(readFileSync(join(process.cwd(), TS_CONFIG_PATH))).compilerOptions.paths, {
    prefix: `<rootDir>/${SRC_PATH}`
  })
}
