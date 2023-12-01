import { HttpStatus } from '@nestjs/common'

export class EnrichedExceptionError extends Error {
  public readonly statusCode: HttpStatus
  public readonly message: string
  public readonly cause?: unknown
  public error?: unknown
  public errors?: unknown[]
  public service?: string

  constructor (error: Omit<EnrichedExceptionError, 'name' | 'statusCode'> & Partial<Pick<EnrichedExceptionError, 'statusCode'>>) {
    super(error.message)

    delete this.stack
    this.name = error?.error instanceof Error ? error.error.name : typeof error?.error === 'string' ? error.error : undefined

    // TODO: types can be updated whenever typescript is updated, <5 is acts stupid for this
    if ('response' in error && typeof (error as any).response === 'object') {
      if (this.message && 'message' in (error as any).response) {
        delete (error as any).response.message
      }

      Object.assign(this, (error as any).response)

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
