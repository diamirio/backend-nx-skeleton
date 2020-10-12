export function isVerbose (): boolean {
  return process.argv.indexOf('--verbose') >= 0
}
