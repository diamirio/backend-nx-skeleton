/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [ 'eslint:recommended', './import' ],
  rules: {
    semi: [ 'error', 'never' ],
    'linebreak-style': [ 'error', 'unix' ],
    'sort-imports': 'off',
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
    'comma-dangle': [ 'error', 'never' ],
    'array-element-newline': [ 'error', 'consistent' ],
    'array-bracket-newline': [ 'error', 'consistent' ],
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
    'no-prototype-builtins': 'off',
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
    'valid-typeof': 'warn',
    'arrow-parens': [ 'error', 'always' ],
    'keyword-spacing': 'error',
    'lines-between-class-members': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: [ 'const', 'let', 'var' ],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: [ 'const', 'let', 'var' ],
        next: [ 'const', 'let', 'var' ]
      },
      {
        blankLine: 'always',
        prev: [ 'case', 'default' ],
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [ 'function', 'if', 'try', 'break', 'class', 'for', 'while', 'do' ]
      }
    ]
  }
}
