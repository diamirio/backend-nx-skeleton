module.exports = {
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      plugins: [ '@typescript-eslint' ],
      extends: [ './index', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended' ],
      // parserOptions: {
      //   project: './tsconfig.json',
      //   ecmaVersion: 2018,
      //   sourceType: 'module'
      // },
      rules: {
        // this is a bit buggy at the moment
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'warn',
          {
            multiline: {
              delimiter: 'none',
              requireLast: true
            },
            singleline: {
              delimiter: 'comma',
              requireLast: false
            }
          }
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/brace-style': [
          'error',
          '1tbs',
          {
            allowSingleLine: true
          }
        ],
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: [ 'camelCase' ]
          },

          {
            selector: 'variable',
            format: [ 'camelCase', 'UPPER_CASE' ]
          },

          // {
          //   select: 'function',
          //   format: [ 'camelCase', 'PascalCase' ]
          // },

          {
            selector: 'parameter',
            format: [ 'camelCase' ],
            leadingUnderscore: 'allow'
          },

          {
            selector: 'memberLike',
            modifiers: [ 'private' ],
            format: [ 'camelCase' ],
            leadingUnderscore: 'forbid'
          },

          {
            selector: 'enumMember',
            format: [ 'camelCase', 'UPPER_CASE' ]
          },

          {
            selector: 'typeLike',
            format: [ 'PascalCase' ]
          },

          {
            selector: 'interface',
            format: [ 'PascalCase' ],
            custom: {
              regex: '^I[A-Z]',
              match: false
            }
          }
        ],
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/func-call-spacing': [ 'error', 'never' ],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'error',
        // '@typescript-eslint/no-floating-promises': 'error',
        // '@typescript-eslint/return-await': [ 'error', 'never' ],
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': [ 'error' ],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': [ 'error' ],
        '@typescript-eslint/comma-spacing': [
          'error',
          {
            before: false,
            after: true
          }
        ],
        '@typescript-eslint/indent': [
          'error',
          2,
          {
            ignoreComments: false
          }
        ],
        '@typescript-eslint/quotes': [ 'error', 'single' ],
        '@typescript-eslint/semi': [ 'error', 'never' ],
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-parens': [ 'error', 'always' ],
        '@typescript-eslint/no-use-before-define': 'off'
      }
    }
  ]
}
