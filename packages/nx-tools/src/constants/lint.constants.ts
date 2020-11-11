/**
 * Default eslint configuration to inject to repository.
 */
export function eslintJson (options: { packageScope?: string, override?: Record<string, any> }): Record<string, any> {
  return (
    options.override ?? {
      extends: [],
      rules: {
        'import/order': [
          'error',
          {
            pathGroups: [
              {
                pattern: `@${options?.packageScope ?? 'package'}/**`,
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
  )
}
