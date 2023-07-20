import { HttpException } from '@nestjs/common'

export function isHttpException (exception: unknown): exception is HttpException {
  if (exception instanceof HttpException) {
    return true
  }

  return false
}
