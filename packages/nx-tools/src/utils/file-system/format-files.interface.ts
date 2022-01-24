/**
 * Format files as a rule in a tree.
 *
 * Requires configuration to be present in the current tree.
 *
 * Will use prettier first, others after.
 */
export interface FormatFilesOptions {
  /** A condition that can skip the formatting. */
  skip?: boolean
  /** Use prettier */
  prettier?: boolean
  /** Use eslint */
  eslint?: boolean
}
