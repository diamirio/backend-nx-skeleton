const { loadTsConfig } = require('load-tsconfig')

/**
 * @param {{ paths?: string[] tsconfig?: string, tsconfigDir?: string}} options
 * @returns {import("eslint").Linter.Config['rules']}
 */
function generateImportGroups (options) {
  const defaults = [ '@webundsoehne', '@webundsoehne-*' ]

  options.paths = Array.isArray(options.paths) ? [ ...options.paths, ...defaults ] : defaults

  /** @type {string[]} */
  let tsConfigPaths = []

  if (options.tsconfigDir) {
    const tsconfig = loadTsConfig(options.tsconfigDir, options.tsconfig)

    if (tsconfig.data?.compilerOptions?.paths) {
      tsConfigPaths = Object.keys(tsconfig.data.compilerOptions.paths).map((path) => {
        return path.replace('*', '**')
      })
    }
  }

  return {
    'import/order': [
      'error',
      {
        pathGroups: [
          ...options.paths.reduce((o, path) => {
            return [
              ...o,

              {
                pattern: `${path}/**`,
                group: 'index'
              },

              {
                pattern: `${path}`,
                group: 'index'
              }
            ]
          }, []),
          ...tsConfigPaths.reduce((o, path) => {
            return [
              ...o,

              {
                pattern: `${path}`,
                group: 'index'
              }
            ]
          }, [])
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

module.exports = { generateImportGroups }
