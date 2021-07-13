import { ListrTaskWrapper } from 'listr2'

import { ConvertToPromptType } from './parse-arguments.interface'
import { color } from '@utils/logger'

/**
 * @deprecated Now nx schema.json should be utilized better.
 *
 * Parses arguments coming from the cli.
 * The arguments can multiple separated by commas or single.
 * The argument can be marked as required, which in that case will throw an error if not provided.
 * @param task
 * @param args
 * @param validArgs
 * @param options
 */
export function parseArguments<T> (
  task: ListrTaskWrapper<any, any>,
  args: string | string[],
  validArgs: { name: string }[],
  options?: { required?: boolean, single?: boolean }
): T {
  const parsedValidArgs = validArgs.reduce((o, val) => {
    return [ ...o, val.name ]
  }, [])

  if (typeof args === 'string') {
    args = args.split(',')
  }

  const parsedArgs = args.reduce((o, val) => {
    if (isCorrectType<T>(parsedValidArgs, val)) {
      return [ ...o, val ]
    } else {
      task.output = color.yellow(`Skipping "${val}" since it is not a valid entry.`)

      return o
    }
  }, [])

  // check empty after parsed
  if (options.required && parsedArgs.length === 0) {
    throw new Error(`Arguments does not match the valid argument list of: "${parsedValidArgs}"`)
  }

  // check if single argument is required
  if (options.single && parsedArgs.length !== 1) {
    throw new Error(`Only select one of the given valid argument list of: "${parsedValidArgs}"`)
  }

  return parsedArgs as unknown as T
}

export function isCorrectType<T> (keys: string[], value: any): value is T {
  return keys.indexOf(value) !== -1
}

export function mapPromptChoices<T> (self: any, names: Record<string, string>): ConvertToPromptType<T> {
  return Object.keys(self).map((o) => ({
    name: self[o],
    message: names[self[o]]
  }))
}
