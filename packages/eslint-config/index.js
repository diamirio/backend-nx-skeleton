module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [ 'import' ],
  extends: [ 'eslint:recommended' ],
  rules: {
    semi: [ 'error', 'never' ],
    'linebreak-style': [ 'error', 'unix' ],
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@src/**',
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
    ],
    indent: [ 'error', 2 ],
    'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'func-call-spacing': [ 'error', 'never' ],
    'max-len': [
      'error',
      {
        code: 180,
        comments: 0
      }
    ],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'space-before-function-paren': 'error',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 3,
          consistent: true
        },
        ObjectPattern: 'never',
        ImportDeclaration: {
          multiline: true,
          minProperties: 10
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 10
        }
      }
    ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-element-newline': [ 'error', 'consistent' ],
    'array-bracket-newline': [ 'error', 'consistent' ],
    'comma-dangle': [ 'error', 'never' ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        objectsInArrays: true,
        arraysInArrays: true
      }
    ],
    complexity: [ 'error', 20 ],
    'constructor-super': 'error',
    'dot-notation': 'error',
    eqeqeq: [ 'error', 'smart' ],
    quotes: [ 'error', 'single' ],
    'quote-props': [ 'error', 'as-needed' ],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'max-classes-per-file': 'off',
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'error',
    'no-invalid-this': 'off',
    'no-new-wrappers': 'error',
    'no-shadow': [
      'off',
      {
        hoist: 'all'
      }
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'error',
    'object-shorthand': 'error',
    'one-var': [ 'error', 'never' ],
    'template-curly-spacing': [ 'error', 'never' ],
    radix: 'error',
    'spaced-comment': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'warn'
  }
}
