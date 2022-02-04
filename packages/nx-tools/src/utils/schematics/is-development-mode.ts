import { ProcessToken } from '@constants/token.constants'

/**
 * Returns if angular cli is running with development flag.
 */
export function isDevelopmentMode (): boolean {
  return !!process.env?.[ProcessToken.DEVELOPMENT_MODE]
}

export function setDevelopmentMode (): void {
  process.env.NG_DEVELOP = '1'
}
