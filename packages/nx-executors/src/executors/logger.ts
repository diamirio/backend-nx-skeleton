import type { ExecutorContext } from 'nx/src/config/misc-interfaces'
import { EOL } from 'os'

export class LogWriter {
  constructor (private readonly context?: ExecutorContext) {}

  stdout (message: string): void {
    this.handleMessage(message, 'stdout')
  }

  stderr (message: string): void {
    this.handleMessage(message, 'stderr')
  }

  protected handleMessage (message: string, stream: 'stdout' | 'stderr'): void {
    const messageLines = message.split(EOL)

    for (let i = 0, len = messageLines.length; i < len; ++i) {
      if (messageLines[i].length > 0) {
        process[stream].write(this.messageFormat(messageLines[i]))
      }
    }
  }

  protected messageFormat (text: string): string {
    const prefix = this.context?.projectName ? `[${this.context.projectName}] ` : ''
    const suffix = text.endsWith(EOL) ? '' : EOL

    return `${prefix}${text}${suffix}`
  }
}
