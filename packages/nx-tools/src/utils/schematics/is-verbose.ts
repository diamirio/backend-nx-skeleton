/**
 * Returns if angular cli is running with verbose flag.s
 */
export function isVerbose (): boolean {
  return process.argv.indexOf('--verbose') >= 0
}

// Enable debugging logger if in verbose mode
if (isVerbose()) {
  process.env.NG_DEBUG = '1'
}
