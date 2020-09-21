import { eslintPluginVersion } from './versions'

export const eslintDeps = {
  dependencies: {},
  devDependencies: {
    '@webundsoehne/eslint-config': '*',
    '@typescript-eslint/eslint-plugin': eslintPluginVersion['@typescript-eslint/eslint-plugin'],
    'eslint-plugin-import': eslintPluginVersion['eslint-plugin-import']
  }
}

export const eslintJson = {
  extends: [],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@src/**',
            group: 'index'
          },
          {
            pattern: '@server/**',
            group: 'index'
          },
          {
            pattern: '@microservice/**',
            group: 'index'
          },
          {
            pattern: '@task/**',
            group: 'index'
          },
          {
            pattern: '@command/**',
            group: 'index'
          }
        ],
        pathGroupsExcludedImportTypes: [ 'builtin' ],
        groups: [
          [ 'builtin', 'external' ],
          [ 'index', 'parent', 'sibling' ]
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
