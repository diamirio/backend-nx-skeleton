/* eslint-disable @typescript-eslint/naming-convention */
import { NODE_VERSION } from '../index'

export const DEPENDENCIES = {}

export const DEV_DEPENDENCIES = {
  '@nx/eslint': '^20.0.0',
  '@nx/eslint-plugin': '^20.0.0',
  '@types/node': `^${NODE_VERSION}`,
  '@typescript-eslint/eslint-plugin': '^7.14.1',
  '@typescript-eslint/parser': '^7.14.1',
  '@webundsoehne/eslint-config': '^6',
  eslint: '^8',
  'eslint-config-prettier': '^9.1.0',
  'eslint-module-utils': '^2',
  'eslint-plugin-import': '^2',
  'lint-staged': '^13',
  'simple-git-hooks': '^2',
  'ts-node': '^10',
  'ts-node-dev': '^2',
  'ts-patch': '^3',
  typescript: '^5.6',
  'typescript-transform-paths': '^3'
}
