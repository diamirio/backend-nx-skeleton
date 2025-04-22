/* eslint-disable @typescript-eslint/naming-convention */
import { NODE_VERSION } from '../index'

export const DEPENDENCIES = {}

export const DEV_DEPENDENCIES = {
  '@nx/eslint': '^20',
  '@nx/eslint-plugin': '^20',
  '@types/node': `^${NODE_VERSION}`,
  '@typescript-eslint/eslint-plugin': '^7',
  '@typescript-eslint/parser': '^7',
  '@webundsoehne/eslint-config': '^6',
  eslint: '^8',
  'eslint-module-utils': '^2',
  'eslint-plugin-import': '^2',
  'lint-staged': '^13',
  'simple-git-hooks': '^2',
  'ts-node': '^10',
  'ts-node-dev': '^2',
  'ts-patch': '^3',
  typescript: '^5',
  'typescript-transform-paths': '^3'
}
