import { Injectable, Logger } from '@nestjs/common'
import fs from 'fs-extra'
import moment from 'moment'

import type { ApiStatus } from './internal.interface'
import { ConfigParam, Configurable } from '@webundsoehne/nestjs-util'

@Injectable()
export class InternalService {
  private logger = new Logger(InternalService.name)

  @Configurable()
  async checkApiStatus (@ConfigParam('misc.lastUpdateFile', '.last-update') lastUpdateFilePath?: string): Promise<ApiStatus> {
    let lastUpdate: string

    try {
      const { mtime } = await fs.stat(lastUpdateFilePath)

      lastUpdate = moment(mtime).toISOString()
    } catch (err) {
      this.logger.warn(`Error while attempting to access last update file ${lastUpdateFilePath}`)
    }

    this.logger.debug('Everything fine')

    return {
      apiVersion: process.env?.PACKAGE_VERSION ?? process.env?.npm_package_version ?? '0.0.0',
      lastUpdate
    }
  }

  @Configurable()
  async getChangelog (@ConfigParam('misc.changelogFile', 'CHANGELOG.md') changelogFilePath?: string): Promise<string> {
    this.logger.verbose('Retrieving changelog')

    return fs.readFile(changelogFilePath, { encoding: 'utf8' })
  }
}
