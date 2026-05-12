import fs from 'node:fs/promises'
import { Injectable, Logger, Optional } from '@nestjs/common'

import type { ApiStatus, InternalOptions } from './interface'

@Injectable()
export class InternalService {
  private readonly logger = new Logger(InternalService.name)
  private readonly options: InternalOptions = {
    enabled: true,
    lastUpdateFile: '.last-update',
    changelogFile: 'CHANGELOG.md',
    includeLastUpdate: true
  }

  constructor(@Optional() options?: InternalOptions) {
    Object.assign(this.options, options)
  }

  async checkApiStatus(): Promise<ApiStatus> {
    let lastUpdate: string

    if (this.options.includeLastUpdate) {
      try {
        const { mtime } = await fs.stat(this.options.lastUpdateFile)

        lastUpdate = new Date(mtime).toISOString()
      } catch (_) {
        this.logger.warn(`Error while attempting to access last update file: ${this.options.lastUpdateFile}`)
      }
    }

    return {
      apiVersion: process.env?.PACKAGE_VERSION ?? process.env?.npm_package_version ?? '0.0.0',
      lastUpdate
    }
  }

  async getChangelog(): Promise<string> {
    this.logger.verbose('Retrieving changelog')

    return fs.readFile(this.options.changelogFile, { encoding: 'utf8' })
  }
}
