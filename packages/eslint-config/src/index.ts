import { defineConfig } from 'eslint/config'

import { baseConfig } from './config/base-config.js'
import { internalPackageImport } from './config/interal-package-import.js'
import { styleConfig } from './config/style-config.js'
import { typescriptConfig } from './config/typescript-config.js'

export { minimal } from './config/minimal-config.js'
export { recommended } from './config/recommended-config.js'
export const configs = {
  base: baseConfig,
  style: styleConfig,
  typescript: typescriptConfig
}
export const utils = {
  defineConfig,
  internalPackageImport
}
