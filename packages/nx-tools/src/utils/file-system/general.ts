export function convertStringToDirPath (dir: string, options: { start?: boolean, end?: boolean } = { end: true, start: false }): string {
  if (options.end && dir.substring(-1) !== '/') {
    dir = dir + '/'
  }

  if (options?.start && dir.substring(1) !== '/') {
    dir = '/' + dir
  }

  return dir
}
