import merge from 'deepmerge'

import { VersionInterface } from './versions.interface'
import { NormalizedSchema } from '@src/schematics/application/main.interface'

// nx
export const nxVersion = '*'

// eslint
export const eslintPluginImportVersion = '2.20.2'

// calculate dependencies
export function calculateDependencies (schema: NormalizedSchema): VersionInterface {
  let dependencies: VersionInterface = baseDeps

  if (schema.tests === 'jest') {
    dependencies = merge(dependencies, testDeps)
  }

  if (schema.components.includes('server') && schema.server === 'restful') {
    dependencies = merge(dependencies, restServerDeps)
  }

  if(schema.components.includes('command')) {
    dependencies = merge(dependencies, commandModuleDeps)
  }

  if (schema.database.includes('typeorm')) {
    dependencies = merge(dependencies, typeormDeps)
  }

  return dependencies
}

export const testDeps: VersionInterface = {
  dev: {
    '@nestjs/testing': '^7.2.0'
  }
}

// base dependencies
export const baseDeps: VersionInterface = {
  prod: {
    '@nestjs/common': '^7.2.0',
    '@nestjs/core': '^7.2.0',
    '@nestjsx/crud': '^4.6.2',
    rxjs: '^6.5.5',
    'reflect-metadata': '^0.1.13',
    '@webundsoehne/nestjs-util': '^1.0.0',
    'class-transformer': '^0.2.3',
    'class-validator': '^0.12.2',
    'nest-schedule': '^0.6.4'
  },
  dev :{
    'ts-node-dev': '^1.0.0-pre.44',
    'tsconfig-paths': '^3.9.0'
  }
}

// server dependencies for rest
export const restServerDeps: VersionInterface = {
  prod: {
    '@nestjs/platform-fastify': '^7.2.0',
    'fastify-swagger': '^2.6.0',
    '@nestjs/swagger': '^4.5.12'
  },
  dev: {
  }
}

// command module dependencies
export const commandModuleDeps: VersionInterface = {
  prod: {
    'nestjs-command': '1.4.0'
  }
}

// typeorm dependencies
export const typeormDeps: VersionInterface = {
  prod: {
    '@nestjs/typeorm': '^7.1.0',
    typeorm: '^0.2.25'
  }
}