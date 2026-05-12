import { defineConfig } from 'eslint/config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { createNodeResolver, importX } from 'eslint-plugin-import-x'
import { configs as typescriptConfigs } from 'typescript-eslint'

export const typescriptConfig = defineConfig([
  {
    name: 'typescript',
    files: ['**/*.ts'],
    plugins: {
      'import-x': importX as any
    },
    extends: ['import-x/flat/recommended', 'import-x/flat/typescript', typescriptConfigs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs']
        }
      }
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: ['./tsconfig.base.json', '<root>/tsconfig.json']
        }),
        createNodeResolver()
      ]
    },
    rules: {
      'sort-imports': 'off',
      'import-x/export': 'error',
      'import-x/first': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['index', 'parent', 'sibling']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
            orderImportKind: 'ignore'
          },
          distinctGroup: true
        }
      ],
      '@typescript-eslint/consistent-type-imports': 'off', // https://typescript-eslint.io/blog/changes-to-consistent-type-imports-with-decorators
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            'signature',
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
            'public-field',
            'protected-field',
            'private-field',
            'static-field',
            'instance-field',
            'abstract-field',
            'decorated-field',
            'field',
            'public-constructor',
            'protected-constructor',
            'private-constructor',
            'constructor',
            'static-method',
            'public-method',
            'protected-method',
            'private-method',
            'public-abstract-method',
            'protected-abstract-method',
            'abstract-method',
            'method'
          ]
        }
      ],
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
          format: ['UPPER_CASE', 'camelCase', 'PascalCase']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        }
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [typescriptConfigs.disableTypeChecked]
  }
])
