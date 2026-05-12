import { Injectable, Optional } from '@nestjs/common'

import { type ErrorPayload, ProblemJson, type ProblemJsonOptions } from '../interface'
import { ErrorFormatter } from './abstract-error-formatter'

@Injectable()
export class ProblemJsonFormatter extends ErrorFormatter<ProblemJson> {
  private readonly defaultUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'

  constructor(@Optional() private readonly options?: ProblemJsonOptions) {
    super()
  }

  format({ message, statusCode, detail, typeUrl, ...error }: ErrorPayload & ProblemJsonOptions): ProblemJson {
    return {
      type: this.buildTypeUrl(typeUrl, statusCode),
      title: message,
      status: statusCode,
      detail,
      ...error
    }
  }

  getContentType(): string {
    return 'application/problem+json'
  }

  private buildTypeUrl(typeUrl: string, statusCode: number): string {
    return typeUrl || `${(this.options?.typeUrl || this.defaultUrl).replace(/\/$/, '')}/${statusCode}`
  }
}
