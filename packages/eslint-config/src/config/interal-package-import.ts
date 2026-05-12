import type { ConfigArray } from 'typescript-eslint'

/**
 * @param regex e.g. '^@scope/'
 */
export const internalPackageImport = (regex?: string): ConfigArray => [
  {
    settings: {
      'import-x/internal-regex': regex
    }
  }
]
