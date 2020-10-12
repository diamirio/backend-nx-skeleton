import { Rule } from '@angular-devkit/schematics'

/**
 * Run something in a rule. It is just a empty function runs on condition. Just added to make everything look cleaner.
 * @param run
 * @param args
 * @param condition
 */
export function runInRule<T extends unknown> (run: (args: T) => void, args: T, condition = true): Rule {
  return (): void => condition ? run(args) : null
}
