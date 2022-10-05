import { LockerService, YamlParser } from '@cenk1cenk2/oclif-common'
import { join } from 'path'

import type { LocalLockFile } from '@interfaces/lock-file.interface'

export class BrownieLocker extends LockerService<LocalLockFile> {
  constructor (root?: string[]) {
    super(join(process.cwd(), '.brownie.lock'), new YamlParser(), root)
  }
}
