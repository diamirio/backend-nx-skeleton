/**
 * Available generator modes.
 */
export enum AvailableSchemaModes {
  CREATE = 'create',
  MODIFY = 'modify'
}

/**
 * Available test configurations.
 */
export enum AvailableTestsTypes {
  NONE = 'none',
  JEST = 'jest'
}

/**
 * Available Linters
 */
export enum AvailableLinterTypes {
  ESLINT = 'eslint',
  NONE = 'none'
}

export type PrettyNames<T extends string = never> = Record<T | AvailableSchemaModes | AvailableTestsTypes | AvailableLinterTypes, string>

/**
 * Prettified names for components to use with prompts and such.
 */
export const PrettyNamesDefault: PrettyNames = {
  [AvailableSchemaModes.CREATE]: 'Create new application',
  [AvailableSchemaModes.MODIFY]: 'Modify existing application',
  [AvailableTestsTypes.JEST]: 'Jest',
  [AvailableLinterTypes.ESLINT]: 'Eslint',
  none: 'None'
}
