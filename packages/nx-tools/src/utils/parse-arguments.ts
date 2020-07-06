import chalk from 'chalk'
import { ListrTaskWrapper } from 'listr2'

export function parseArguments <T> (task: ListrTaskWrapper<any, any>, args: string, validArgs: {name: string}[], options?: {required?: boolean, single?: boolean}): T {
  const arg = args.split(',')

  const parsedValidArgs = validArgs.reduce((o, val) => {
    return [ ...o, val.name ]
  }, [])

  const parsedArgs = arg.reduce((o, val) => {
    if (isCorrectType<T>(parsedValidArgs, val)) {
      return [ ...o, val ]
    } else {
      task.output = chalk.yellow(`Skipping "${val}" since it is not a valid entry.`)

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

export function isCorrectType <T> (keys: string[], value: any): value is T {
  return keys.indexOf(value) !== -1
}