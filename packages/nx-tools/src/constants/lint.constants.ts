/**
 * Default eslint configuration to inject to repository.
 */
export function eslintJson (options: { packageScope?: string, override?: Record<string, any> }): Record<string, any> {
  return (
    options.override ?? {
      root: true,
      plugins: [ '@nrwl/nx' ],
      extends: [ '@webundsoehne/eslint-config/index', '@webundsoehne/eslint-config/typescript' ],
      rules: {
        'import/order': [
          'error',
          {
            pathGroups: [
              {
                pattern: `@{webundsoehne,webundsoehne-private,${options.packageScope}}/**`,
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
      },
      overrides: []
    }
  )
}
