/**
 * Updates every key to support node-config environment variable format and makes it DeepPartial.
 */
export type ConfigEnvironmentVariables<T> = {
  [P in keyof T]?: ConfigEnvironmentVariables<T[P]> | string | Record<'__name' | '__format', string>
}
