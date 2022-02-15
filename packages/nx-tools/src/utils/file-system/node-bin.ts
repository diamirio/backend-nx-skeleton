import { delimiter, dirname, join, normalize } from 'path'

import { findNxRoot } from './find-nx-root'
import type { NodeBinaryPathExtensions, NodeBinaryPathExtensionsOptions } from './node-bin.interface'
import type { EnvironmentVariables } from '@interfaces/environment-variables.interface'
import { Logger } from '@utils/logger'

const log = new Logger()

export function getNodeBinaryPathExtensions (options?: NodeBinaryPathExtensionsOptions): NodeBinaryPathExtensions | undefined {
  const extensions = setPath(options)

  log.debug('Environment should be extended with node_modules binaries: %o', extensions)

  return extensions
}

export function setNodeOptionsEnvironmentVariables (env: string | string[] | Record<string, string>): EnvironmentVariables {
  if (typeof env === 'string') {
    return { NODE_OPTIONS: env }
  } else if (typeof env === 'object' && Array.isArray(env)) {
    return { NODE_OPTIONS: env.join(' ') }
  } else {
    return Object.values(env).reduce<EnvironmentVariables>(
      (o, [key, value]) => {
        return { NODE_OPTIONS: [o.NODE_OPTIONS, `${key}=${value}`].join(' ') }
      },
      { NODE_OPTIONS: '' }
    )
  }
}

// starting at the directory provided, split the path into segments and return
// an array containing the segment plus 'node_modules/.bin' for each. we use
// this to ensure all of our own bin directories are in the path
function getBinPaths ({ start = process.cwd(), top = findNxRoot() }: { start: string, top?: string }): string[] {
  // we call path.normalize() on the inputs so that we'll have the correct
  // separators in place consistently in windows. if you provide windows style
  // paths in posix though, you're in for a bad time because normalize will
  // just leave it alone
  const realTop = normalize(top)
  let current = normalize(start)

  const binPaths = [join(current, 'node_modules/.bin')]

  do {
    current = dirname(current)

    binPaths.push(join(current, 'node_modules/.bin'))
  } while (current !== dirname(current) && realTop !== current)

  return binPaths
}

// take any PATH related environment variables and normalize them into an array
// we do this because in Windows it's typically Path, but that's not guaranteed
// and it can also come from more than one environment variable. we merge them
// together to normalize and return an array of path segments here
function normalizePath (options: { env: Record<string, string> }): string[] {
  const pathSegments = Object.keys(options.env)
    .filter((key) => key.toLowerCase() === 'path')
    .reduce<string[]>((acc, key) => acc.concat(options.env[key].split(delimiter)), [])

  return pathSegments
}

// given an object with an env object, a starting directory, and a top directory
// return a new env object where all keys whose lowercase name is 'path' with a
// new path built by combining the bin directories with all of the existing path
// values. we intentionally do not modify the original env object
function setPath (options?: NodeBinaryPathExtensionsOptions): NodeBinaryPathExtensions | undefined {
  options = {
    env: process.env,
    ...options
  }

  const fullPath = [...getBinPaths({ start: options?.start, top: options?.top }), ...normalizePath({ env: options?.env })].join(delimiter)

  // don't stomp on the currently running environment
  const result = { ...options?.env ?? {} }

  for (const key of Object.keys(result)) {
    if (key.toLowerCase() === 'path') {
      return { key, path: fullPath }
    }
  }
}
