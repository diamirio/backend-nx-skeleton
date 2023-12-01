export function isGenericStringError (exception: unknown): exception is string {
  if (typeof exception === 'string') {
    return true
  }

  return false
}
