import { BuilderOutput } from '@angular-devkit/architect'
import { from, Observable, tap } from 'rxjs'

/**
 * For compatibility reasons with the new nx versions.
 */
export function toObservable<T extends BuilderOutput> (promiseOrAsyncIterator: Promise<T> | AsyncIterableIterator<T>): Observable<T | any> {
  if (typeof (promiseOrAsyncIterator as any).then === 'function') {
    return from(promiseOrAsyncIterator as Promise<T>).pipe(
      tap((result) => {
        if (!result.success && result.error) {
          throw result.error
        }
      })
    )
  } else {
    return new Observable((subscriber) => {
      const asyncIterator = promiseOrAsyncIterator as AsyncIterableIterator<T>

      const recurse = (iterator: AsyncIterableIterator<T>): void => {
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
