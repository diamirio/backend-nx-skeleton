import { Injectable, Logger } from '@nestjs/common'
import fs from 'fs-extra'
import moment from 'moment'

import type { ApiStatus } from './internal.interface'
import { ConfigParam, Configurable } from '@provider/config'

@Injectable()
export class InternalService {
  private logger = new Logger(InternalService.name)

  @Configurable()
  public async checkApiStatus (@ConfigParam('misc.lastUpdateFile', '.last-update') lastUpdateFilePath?: string): Promise<ApiStatus> {
    let lastUpdate

    try {
      const { mtime } = await fs.stat(lastUpdateFilePath)

      lastUpdate = moment(mtime).toISOString()
    } catch (err) {
      this.logger.warn(`Error while attempting to access last update file ${lastUpdateFilePath}`)
    }

    return {
      apiVersion: process.env.PACKAGE_VERSION,
      lastUpdate
    }
  }

  @Configurable()
  public async getChangelog (@ConfigParam('misc.changelogFile', 'CHANGELOG.md') changelogFilePath?: string): Promise<string> {
    this.logger.verbose('Retrieving changelog')

    return fs.readFile(changelogFilePath, { encoding: 'utf8' })
  }
}
