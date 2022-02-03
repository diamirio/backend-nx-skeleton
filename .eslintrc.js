/** @type {import("eslint").Linter} */
module.exports = {
  extends: ['./packages/eslint-config/typescript-dynamic'],
  rules: {
    ...require('@webundsoehne/eslint-config/utils').generateImportGroups({ tsconfigDir: __dirname })
  }
}
