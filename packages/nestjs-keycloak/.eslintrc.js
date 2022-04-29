/* eslint-disable import/no-extraneous-dependencies */
/** @type {import("eslint").Linter } */
module.exports = {
  extends: '../../.eslintrc.cjs',
  rules: {
    ...require('@webundsoehne/eslint-config/utils').generateImportGroups({ tsconfigDir: __dirname })
  }
}
