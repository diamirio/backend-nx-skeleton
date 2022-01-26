import { ProcessToken } from '@constants/token.constants'

/**
 * Returns if angular cli is running with verbose flag.s
 */
export function isVerbose (): boolean {
  return process.argv.indexOf('--verbose') >= 0 || process.argv.indexOf('--debug') >= 0 || !!process.env?.[ProcessToken.DEBUG_MODE]
}
