#!/usr/bin/env node

if (process.argv.indexOf('--trace') > -1 || process.argv.indexOf('--debug') > -1 || process.argv.indexOf('--verbose') > -1) {
  process.env.NG_DEBUG = '1'
}

const oclif = require('@oclif/core')

require('@cenk1cenk2/oclif-common').setup()

oclif.run().then(oclif.flush).catch(oclif.Errors.handle)
