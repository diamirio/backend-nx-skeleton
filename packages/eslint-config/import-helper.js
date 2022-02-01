/**
 * @param {string[]} cases
 * @returns {import("eslint").Linter.Config['rules']}
 */
function generateImportPluginGroupCases (cases) {
  return {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: `@{${cases.join(',')}}/**`,
            group: 'index'
          },

          {
            pattern: `@{${cases.join(',')}}`,
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

module.exports = generateImportPluginGroupCases
