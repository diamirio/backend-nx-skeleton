/* eslint-disable @typescript-eslint/naming-convention */
import { NODE_VERSION } from '../index'

export const DEPENDENCIES = {
  '@fastify/static': '^6',
  '@fastify/swagger': '^8.11.0',
  '@nestjs/axios': '^3.0.0',
  '@nestjs/common': '^10',
  '@nestjs/core': '^10',
  '@nestjs/platform-fastify': '^10',
  '@nestjs/schedule': '^4.0.1',
  '@nestjs/swagger': '^7.1.13',
  '@webundsoehne/nestjs-util': '^7.1.6',
  'class-transformer': '^0.5.1',
  'class-validator': '^0.14.0',
  'js-yaml': '^4.1.0',
  'reflect-metadata': '^0.1.13'
}

export const DEV_DEPENDENCIES = {
  '@nx/eslint': '^20.0.0',
  '@nx/eslint-plugin': '^20.0.0',
  '@nx/workspace': '^20.0.0',
  '@types/node': `^${NODE_VERSION}`,
  '@typescript-eslint/eslint-plugin': '^7.14.1',
  '@typescript-eslint/parser': '^7.14.1',
  '@webundsoehne/eslint-config': '^6',
  '@webundsoehne/nx-nest': '^6.0.0-beta.6',
  eslint: '^8',
  'eslint-config-prettier': '^9.1.0',
  'eslint-module-utils': '^2',
  'eslint-plugin-import': '^2',
  'lint-staged': '^13',
  nx: '^20.0.0',
  prettier: '^2.7.1',
  'simple-git-hooks': '^2',
  'ts-node': '^10',
  'ts-node-dev': '^2',
  'ts-patch': '^3',
  typescript: '~5.5', // fixed minor-version until "typescript-transform-paths" works with version 5.6+
  'typescript-transform-paths': '^3'
}
