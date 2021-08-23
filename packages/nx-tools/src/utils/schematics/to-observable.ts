import { Observable } from 'rxjs'

/**
 * For compatibility reasons with the new nx versions.
 */
export function toObservable<T extends { success: boolean }> (promiseOrAsyncIterator: Promise<T> | AsyncIterableIterator<T>): Observable<T> {
  if (typeof (promiseOrAsyncIterator as any).then === 'function') {
    return require('rxjs').from(promiseOrAsyncIterator as Promise<T>)
  } else {
    return new (require('rxjs').Observable)((subscriber) => {
      const asyncIterator = promiseOrAsyncIterator as AsyncIterableIterator<T>

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function recurse (iterator: AsyncIterableIterator<T>) {
        iterator
          .next()
          .then((result) => {
            if (!result.done) {
              subscriber.next(result.value)
              recurse(iterator)
            } else {
              if (result.value) {
                subscriber.next(result.value)
              }
              subscriber.complete()
            }
          })
          .catch((e) => {
            subscriber.error(e)
          })
      }

      recurse(asyncIterator)

      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return () => {
        asyncIterator.return()
      }
    })
  }
}
