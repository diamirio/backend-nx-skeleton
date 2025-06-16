import { defineConfig } from 'eslint/config'

export const baseConfig = defineConfig([
  {
    name: 'base',
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    rules: {
      'constructor-super': 'error',
      'dot-notation': 'error',
      'guard-for-in': 'error',
      'max-classes-per-file': 'off',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-empty': 'warn',
      'no-eval': 'error',
      'no-invalid-this': 'off',
      'no-new-wrappers': 'error',
      'no-prototype-builtins': 'off',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'warn',
      'no-unused-vars': 'off',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'require-await': 'off',
      'use-isnan': 'error',
      'valid-typeof': 'warn',
      complexity: ['error', 48],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'smart'],
      radix: 'error'
    }
  }
])
