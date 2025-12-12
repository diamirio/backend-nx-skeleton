import { defineConfig, globalIgnores } from 'eslint/config'
import { type ConfigArray } from 'typescript-eslint'

import { baseConfig } from './base-config.js'
import { styleConfig } from './style-config.js'
import { typescriptConfig } from './typescript-config.js'

export const recommended: ConfigArray = defineConfig(
  globalIgnores(['dist/**', '**/migration/*']),
  baseConfig,
  typescriptConfig,
  styleConfig
)
