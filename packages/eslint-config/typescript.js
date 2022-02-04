/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./index'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: {},
      rules: {
        // this is a bit buggy at the moment
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false
          }
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'off',
              constructors: 'no-public',
              methods: 'no-public',
              properties: 'off',
              parameterProperties: 'off'
            }
          }
        ],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'error',
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
        '@typescript-eslint/member-ordering': [
          'warn',
          {
            default: [
              // Index signature
              'signature',

              // Fields
              'public-static-field',
              'protected-static-field',
              'private-static-field',

              'public-instance-field',
              'public-decorated-field',
              'protected-instance-field',
              'protected-decorated-field',
              'private-instance-field',
              'private-decorated-field',

              'public-abstract-field',
              'protected-abstract-field',
              'private-abstract-field',

              'public-field',
              'protected-field',
              'private-field',

              'static-field',
              'instance-field',
              'abstract-field',

              'decorated-field',

              'field',

              // Constructors
              'public-constructor',
              'protected-constructor',
              'private-constructor',

              'constructor',

              // Getters
              // 'public-static-get',
              // 'protected-static-get',
              // 'private-static-get',
              //
              // 'public-instance-get',
              // 'public-decorated-get',
              // 'protected-instance-get',
              // 'protected-decorated-get',
              // 'private-instance-get',
              // 'private-decorated-get',
              //
              // 'public-abstract-get',
              // 'protected-abstract-get',
              // 'private-abstract-get',
              //
              // 'public-get',
              // 'protected-get',
              // 'private-get',
              //
              // 'static-get',
              // 'instance-get',
              // 'abstract-get',
              //
              // 'decorated-get',

              // 'get',

              // Setters
              // 'public-static-set',
              // 'protected-static-set',
              // 'private-static-set',
              //
              // 'public-instance-set',
              // 'public-decorated-set',
              // 'protected-instance-set',
              // 'protected-decorated-set',
              // 'private-instance-set',
              // 'private-decorated-set',
              //
              // 'public-abstract-set',
              // 'protected-abstract-set',
              // 'private-abstract-set',
              //
              // 'public-set',
              // 'protected-set',
              // 'private-set',
              //
              // 'static-set',
              // 'instance-set',
              // 'abstract-set',
              //
              // 'decorated-set',

              // 'set',

              // Methods
              // 'public-static-method',
              // 'protected-static-method',
              // 'private-static-method',
              //
              // 'public-instance-method',
              // 'protected-instance-method',
              // 'private-instance-method',
              'static-method',

              'public-method',
              // 'public-decorated-method',
              'protected-method',
              // 'protected-decorated-method',
              'private-method',
              // 'private-decorated-method',

              'public-abstract-method',
              'protected-abstract-method',
              'private-abstract-method',

              // 'instance-method',
              // 'decorated-method',
              'abstract-method',

              'method'
            ]
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase']
          },

          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase', 'UPPER_CASE', 'PascalCase']
          },

          {
            selector: 'variable',
            format: ['camelCase']
          },

          {
            selector: 'function',
            format: ['camelCase', 'PascalCase']
          },

          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'forbid'
          },

          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase'],
            modifiers: ['unused'],
            leadingUnderscore: 'require'
          },

          {
            selector: 'property',
            format: ['camelCase', 'UPPER_CASE', 'snake_case']
          },

          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid'
          },

          {
            selector: 'enumMember',
            format: ['UPPER_CASE', 'camelCase']
          },

          {
            selector: 'typeLike',
            format: ['PascalCase']
          }
        ],
        '@typescript-eslint/no-parameter-properties': 'off',
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error'],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'error',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error'],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['error'],
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
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true
          }
        ],
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {
            allowConstructorOnly: true,
            allowEmpty: false,
            allowStaticOnly: true,
            allowWithDecorator: true
          }
        ],
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': ['error'],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': ['off'],
        'padding-line-between-statements': 'off',
        '@typescript-eslint/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return'
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*'
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var']
          },
          {
            blankLine: 'always',
            prev: ['case', 'default'],
            next: '*'
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type']
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['function', 'if', 'try', 'break', 'class', 'for', 'while', 'do']
          }
        ]
      }
    }
  ]
}
