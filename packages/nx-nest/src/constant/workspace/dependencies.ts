import { DEPENDENCY_VERSIONS } from '../dependencies'
import { NODE_VERSION } from '../index'

export const DEPENDENCIES = {}

export const DEV_DEPENDENCIES = {
  '@types/node': `^${NODE_VERSION}`,
  '@diamir/eslint-config': DEPENDENCY_VERSIONS['@diamir/eslint-config'],
  eslint: DEPENDENCY_VERSIONS.eslint,
  'simple-git-hooks': DEPENDENCY_VERSIONS['simple-git-hooks'],
  'ts-node': DEPENDENCY_VERSIONS['ts-node'],
  'ts-node-dev': DEPENDENCY_VERSIONS['ts-node-dev'],
  'ts-patch': DEPENDENCY_VERSIONS['ts-patch'],
  typescript: DEPENDENCY_VERSIONS.typescript,
  'typescript-transform-paths': DEPENDENCY_VERSIONS['typescript-transform-paths']
}
