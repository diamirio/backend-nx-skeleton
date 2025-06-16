// biome-ignore-all lint/style/useNamingConvention: eslint/stylistic naming
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export const styleConfig = defineConfig([
  {
    name: 'style',
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/array-bracket-spacing': [
        'error',
        'never',
        {
          objectsInArrays: false,
          arraysInArrays: false
        }
      ],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/indent': ['error', 2, { ignoredNodes: [], SwitchCase: 1 }],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/lines-between-class-members': 'off',
      '@stylistic/max-len': [
        'error',
        {
          code: 180,
          comments: 0
        }
      ],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/curly-newline': ['error', { multiline: true, consistent: true }],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            minProperties: 4,
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
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padding-line-between-statements': [
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
          next: ['function', 'if', 'try', 'break', 'class', 'for', 'while', 'do']
        }
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/spaced-comment': 'error',
      '@stylistic/template-curly-spacing': ['error', 'never']
    }
  }
])
