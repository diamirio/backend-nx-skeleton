module.exports = {
  overrides: [
    {
      files: [ '*.tsx' ],
      extends: [ './typescript', './react' ],
      plugins: [ 'react', 'react-hooks' ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/indent': [ 'error', 2 ]
      }
    }
  ]
}