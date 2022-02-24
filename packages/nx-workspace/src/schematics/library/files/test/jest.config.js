const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { default: tsconfigLoader } = require('tsconfig-loader')

const TS_CONFIG_PATH = 'test/tsconfig.json'

/** @type import("@jest/types").Config.InitialOptions */
module.exports = {
  preset: 'ts-jest',
  rootDir: '../',
  testRegex: '(/test/.*|/src/.*).(e2e-)?spec.tsx?$',
  globals: {
    'ts-jest': {
      tsconfig: join('<rootDir>', TS_CONFIG_PATH)
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfigLoader(process.cwd(), TS_CONFIG_PATH).tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/../../'
  })
}
