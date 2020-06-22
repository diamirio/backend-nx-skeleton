import { eslintPluginImportVersion } from './versions'

export const eslintDeps = {
  dependencies: {},
  devDependencies: {
    'eslint-plugin-import': eslintPluginImportVersion
  }
}

/**
 * FIX THIS LATER
 */
export const eslintJson = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  settings: {

  },
  plugins: [ 'import' ],

  /**
   * Inspired by configuration originally found in create-react-app
   * https://github.com/facebook/create-react-app
   */
  rules: {

  }
}