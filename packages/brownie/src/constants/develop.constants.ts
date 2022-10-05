import { Flags } from '@cenk1cenk2/oclif-common'

export const DEVELOP_FLAGS = {
  develop: Flags.boolean({
    description: 'Puts the underlying schematics to development mode, if they support it.',
    default: false,
    env: 'DEVELOP',
    char: 'd'
  })
}
