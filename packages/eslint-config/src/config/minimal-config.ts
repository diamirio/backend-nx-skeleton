import { defineConfig, globalIgnores } from 'eslint/config'
import { type ConfigArray } from 'typescript-eslint'

import { baseConfig } from './base-config.js'
import { typescriptConfig } from './typescript-config.js'

export const minimal: ConfigArray = defineConfig(
  globalIgnores(['dist/**', '**/migration/*']),
  baseConfig,
  typescriptConfig
)
