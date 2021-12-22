export type ConfigEnvironmentVariables<T> = {
  [P in keyof T]?: ConfigEnvironmentVariables<T[P]> | string | Record<'__name' | '__format', string>
}
