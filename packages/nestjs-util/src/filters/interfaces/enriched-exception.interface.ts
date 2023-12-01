import { HttpStatus } from '@nestjs/common'

export class EnrichedExceptionError implements Error {
  public readonly name: string
  public readonly message: string
  public stack?: string
  public readonly statusCode: HttpStatus
  public readonly cause?: unknown
  public error?: unknown
  public errors?: unknown[]
  public service?: string

  constructor (error: Omit<EnrichedExceptionError, 'name' | 'statusCode'> & Partial<Pick<EnrichedExceptionError, 'statusCode'>>) {
    this.name = error?.error instanceof Error ? error.error.name : typeof error?.error === 'string' ? error.error : Error.name

    // TODO: types can be updated whenever typescript is updated, <5 is acts stupid for this
    if ('response' in error && typeof (error as any).response === 'object') {
      if ('message' in error && (error as any).message && 'message' in (error as any).response) {
        delete (error as any).response.message
      }

      Object.assign(error, (error as any).response)

      delete (error as any).response
    }

    if ('status' in error) {
      delete (error as any).status
    }

    if ('options' in error) {
      delete (error as any).options
    }

    Object.assign(this, error)

    this.statusCode ??= HttpStatus.INTERNAL_SERVER_ERROR
  }
}
