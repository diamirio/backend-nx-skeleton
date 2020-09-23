module.exports = {
  extends: [ './packages/eslint-config/index', './packages/eslint-config/typescript' ],
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
            pattern: '@application/**',
            group: 'index'
          },
          {
            pattern: '@init/**',
            group: 'index'
          },
          {
            pattern: '@interfaces/**',
            group: 'index'
          },
          {
            pattern: '@utils/**',
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
