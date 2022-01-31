module.exports = {
  extends: [ './packages/eslint-config/typescript-dynamic' ],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@{webundsoehne,webundsoehne-private,src,interfaces,utils}/**',
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
