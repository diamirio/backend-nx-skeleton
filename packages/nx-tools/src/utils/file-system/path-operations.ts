import { join, parse } from 'path'

/**
 * Replaces given extension.
 * @param path
 * @param extension
 */
export function replaceExtension (path: string, extension: string): string {
  const { dir, name } = parse(path)

  if (extension.startsWith('.')) {
    extension = extension.substring(1)
  }

  return join(dir, `${name}.${extension}`)
}

/**
 * Removes the source root from the given path.
 * @param filename
 * @param sourceRoot
 */
export function removePathRoot (filename: string, sourceRoot: string): string {
  if (filename.startsWith(sourceRoot)) {
    const path = filename.substring(sourceRoot.length)

    return path.startsWith('/') ? path.substring(1) : path
  }

  throw new Error('Root path could not be removed.')
}
