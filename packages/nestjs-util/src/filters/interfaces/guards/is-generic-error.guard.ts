export function isGenericError (exception: unknown): exception is Error {
  if (exception instanceof Error || typeof exception === 'object' && 'message' in exception) {
    return true
  }

  return false
}
