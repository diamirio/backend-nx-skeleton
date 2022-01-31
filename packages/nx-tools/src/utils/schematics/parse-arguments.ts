import type { ConvertToPromptType } from './parse-arguments.interface'

/**
 * Converts the set of choices from an array of names to prettyfiying their names from the second object.
 *
 * @param {any} keys
 * @param {Record<string, string>} names
 * @returns {ConvertToPromptType}
 */
export function mapPromptChoices<T> (keys: any, names: Record<string, string>): ConvertToPromptType<T> {
  return Object.keys(keys).map((o) => ({
    name: keys[o],
    message: names[keys[o]]
  }))
}
