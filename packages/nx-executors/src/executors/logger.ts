import { EOL } from 'node:os'
import type { ExecutorContext } from '@nx/devkit'

export class LogWriter {
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: once used for app-name prefix
  constructor(private readonly _context?: ExecutorContext) {}

  stdout(message: string): void {
    this.handleMessage(message, 'stdout')
  }

  stderr(message: string): void {
    this.handleMessage(message, 'stderr')
  }

  protected handleMessage(message: string, stream: 'stdout' | 'stderr'): void {
    const messageLines = message.split(EOL)

    for (let i = 0, len = messageLines.length; i < len; ++i) {
      if (messageLines[i].length > 0) {
        process[stream].write(this.messageFormat(messageLines[i]))
      }
    }
  }

  protected messageFormat(text: string): string {
    const suffix = text.endsWith(EOL) ? '' : EOL

    return `${text}${suffix}`
  }
}
