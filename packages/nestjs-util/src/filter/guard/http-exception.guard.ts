import { HttpException } from '@nestjs/common'

export function isHttpException (exception: unknown): exception is HttpException {
  if (exception instanceof HttpException) {
    return true
  } else if (typeof exception === 'object' && typeof (exception as any).cause === 'object') {
    return true
  }

  return false
}
