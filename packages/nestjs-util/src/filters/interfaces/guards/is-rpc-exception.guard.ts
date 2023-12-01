import { RpcException } from '@nestjs/microservices'

export function isRpcException (exception: unknown): exception is RpcException {
  if (exception instanceof RpcException) {
    return true
  }

  return false
}
