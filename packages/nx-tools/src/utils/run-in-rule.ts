import { Rule } from '@angular-devkit/schematics'

export function runInRule<T extends unknown> (run: (args: T) => void, args: T, condition = true): Rule {
  return (): void => condition ? run(args) : null
}
