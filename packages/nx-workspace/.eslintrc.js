/** @type {import("eslint").Linter } */
module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    ...require('@webundsoehne/eslint-config/utils').generateImportGroups({ tsconfigDir: __dirname })
  }
}
