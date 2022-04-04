#!/usr/bin/env node

if (process.argv.indexOf('--debug') > -1 || process.argv.indexOf('--verbose') > -1) {
  process.env.NG_DEBUG = '1'
}

require('@cenk1cenk2/boilerplate-oclif/bin/run')

require('@oclif/command').run().catch(require('@oclif/errors/handle'))
