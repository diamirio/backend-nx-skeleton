import { generateInitHook } from '@cenk1cenk2/boilerplate-oclif'
import notifier from 'update-notifier'

import { logo } from '@templates/logo.template'

export default generateInitHook({
  logo,
  preliminaryTask: async (opts) => {
    notifier({ pkg: { name: opts.config.name, version: opts.config.version } }).notify({ isGlobal: true })
  }
})
