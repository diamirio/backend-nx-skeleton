/**
 * Default eslint configuration to inject to repository.
 */
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
            pattern: '@microservice-server/**',
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
