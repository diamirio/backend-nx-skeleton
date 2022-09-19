#!/usr/bin/env node

const oclif = require('@oclif/core')

require('@cenk1cenk2/oclif-common').setup()

oclif.run().then(oclif.flush).catch(oclif.Errors.handle)
