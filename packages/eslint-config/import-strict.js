const { ALL_KNOWN_JAVASCRIPT_FILE_EXTENSIONS } = require('./constants')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ALL_KNOWN_JAVASCRIPT_FILE_EXTENSIONS,
      plugins: [ 'import' ],
      rules: {
        'import/no-extraneous-dependencies': 'error',
        'import/exports-last': 'error'
      }
    }
  ]
}
