import type { ErrorPayload } from '../interface'

export abstract class ErrorFormatter<E> {
  /**
   * Re-Format the error response payload
   * @param {ErrorPayload} error ... Error to apply the format on
   */
  abstract format(error: ErrorPayload): E

  /**
   * Overwrite the response content-type header
   */
  abstract getContentType(): string
}
