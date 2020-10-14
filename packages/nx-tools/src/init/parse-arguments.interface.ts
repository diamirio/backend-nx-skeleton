/**
 * Converts a input type into the prompt type that is consumed by enquirer.
 */
export type ConvertToPromptType<T> = {
  [name: string]: any
  name: T
  message: string
}[]
