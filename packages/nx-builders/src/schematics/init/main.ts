import { chain, Rule } from '@angular-devkit/schematics'

import { initiateBuilderDependencies } from '@src/utils/initiate-builder'

export default function (): Rule {
  return chain([initiateBuilderDependencies(['ts-node-dev', 'tsc'])])
}
