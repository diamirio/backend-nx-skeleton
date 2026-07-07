import { defineConfig, mergeConfig } from 'vitest/config'

import configShared from '../../vitest.config'

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      name: 'seeder',
      root: './'
    }
  })
)
