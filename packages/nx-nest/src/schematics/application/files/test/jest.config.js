const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { loadSync } = require('tsconfig')

const TS_CONFIG_PATH = 'test/tsconfig.json'

module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '(/test/.*|/src/.*).(e2e-)?spec.tsx?$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: join('<rootDir>', TS_CONFIG_PATH)
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(loadSync(process.cwd(), TS_CONFIG_PATH).compilerOptions.paths, {
    prefix: '<rootDir>/../../'
  })
}
