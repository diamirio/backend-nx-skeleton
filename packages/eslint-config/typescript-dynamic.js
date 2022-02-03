/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/return-await': ['error', 'never'],
        '@typescript-eslint/await-thenable': 'error',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error'],
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': ['error'],
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: true
          }
        ],
        '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }]
      }
    }
  ]
}
