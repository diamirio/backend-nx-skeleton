import { Rule } from '@angular-devkit/schematics'

/**
 * Run something in a rule. It is just a empty function runs on condition. Just added to make everything look cleaner.
 * @param run
 * @param condition
 */
export function runInRule (run: (...args: any[]) => void, condition = true): Rule {
  return (): ((...args: any[]) => void) => condition ? run : null
}
