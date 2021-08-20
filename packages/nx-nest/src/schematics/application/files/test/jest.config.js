const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const load = require('tsconfig-loader')

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
  moduleNameMapper: pathsToModuleNameMapper(load(process.cwd(), TS_CONFIG_PATH).tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/../../'
  })
}
