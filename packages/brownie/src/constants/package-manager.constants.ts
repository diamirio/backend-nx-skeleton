import type { FlagInput } from '@cenk1cenk2/oclif-common'
import { Flags } from '@cenk1cenk2/oclif-common'

import { AvailablePackageManagers } from '@webundsoehne/nx-tools'

export const PACKAGE_MANAGER_FLAGS: FlagInput = {
  ['package-manager']: Flags.enum({
    description: 'Use the given package manager to do the install/update operations.',
    default: AvailablePackageManagers.NPM,
    env: 'PACKAGE_MANAGER',
    char: 'm',
    options: Object.values(AvailablePackageManagers)
  })
}
