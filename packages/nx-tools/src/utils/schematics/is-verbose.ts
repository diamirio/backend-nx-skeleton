/**
 * Returns if angular cli is running with verbose flag.s
 */
export function isVerbose (): boolean {
  return process.argv.indexOf('--verbose') >= 0 || !!process.env?.NG_DEBUG
}
