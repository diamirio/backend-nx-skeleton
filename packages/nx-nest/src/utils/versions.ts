import { PackageVersions } from '@webundsoehne/nx-tools'
import merge from 'deepmerge'

import { NormalizedSchema } from '@src/schematics/application/main.interface'

// nx
export const nxVersion = '*'

// eslint
export const eslintPluginVersion = {
  'eslint-plugin-import': '^2.22.0',
  '@typescript-eslint/eslint-plugin': '^4.1.1'
}

// calculate dependencies
export function calculateDependencies (schema: NormalizedSchema, builders?: boolean): PackageVersions {
  // only add builders
  if (builders) {
    return builderDeps
  }

  let dependencies: PackageVersions = baseDeps

  if (schema.tests === 'jest') {
    dependencies = merge(dependencies, testDeps)
  }

  if (schema.components.includes('server') && schema.server === 'restful') {
    dependencies = merge(dependencies, restServerDeps)
  }

  if (schema.components.includes('server') && schema.server === 'graphql') {
    dependencies = merge(dependencies, graphqlServerDeps)
  }

  if (schema.components.includes('microservice')) {
    dependencies = merge(dependencies, microserviceModuleDeps)
  }

  if (schema.components.includes('bgtask')) {
    dependencies = merge(dependencies, taskModuleDeps)
  }

  if (schema.components.includes('command')) {
    dependencies = merge(dependencies, commandModuleDeps)
  }

  if (schema.database?.includes('typeorm')) {
    dependencies = merge(dependencies, typeormDeps)
  }

  if (schema.database?.includes('mongoose')) {
    dependencies = merge(dependencies, mongooseDeps)
  }

  return dependencies
}

export const builderDeps: PackageVersions = {
  dev: {}
}

export const testDeps: PackageVersions = {
  dev: {
    '@nestjs/testing': '^7.2.0',
    jest: '^26.1.0',
    'ts-jest': '^26.1.1',
    '@types/jest': '^26.0.3'
  }
}

// base dependencies
export const baseDeps: PackageVersions = {
  prod: {
    '@nestjs/common': '^7.4.4',
    '@nestjs/core': '^7.4.4',
    '@nestjsx/crud': '^4.6.2',
    rxjs: '^6.6.3',
    'reflect-metadata': '^0.1.13',
    '@webundsoehne/nestjs-util': '^1.0.0',
    'class-transformer': '^0.3.1',
    'class-validator': '^0.12.2',
    'nest-schedule': '^0.6.4'
  }
}

// server dependencies for rest
export const restServerDeps: PackageVersions = {
  prod: {
    // pin for graphql version
    '@nestjs/platform-fastify': '7.2.0',
    'fastify-swagger': '^3.3.0',
    '@nestjs/swagger': '^4.6.0'
  }
}

export const graphqlServerDeps: PackageVersions = {
  prod: {
    '@nestjs/graphql': '^7.6.0',
    'apollo-server-fastify': '^2.17.0',
    graphql: '^15.3.0',
    'graphql-tools': '^6.2.3'
  }
}

export const taskModuleDeps: PackageVersions = {}

export const microserviceModuleDeps: PackageVersions = {}

// command module dependencies
export const commandModuleDeps: PackageVersions = {
  prod: {
    'nestjs-command': '1.4.0'
  }
}

// typeorm dependencies
export const typeormDeps: PackageVersions = {
  prod: {
    '@nestjs/typeorm': '^7.1.4',
    typeorm: '^0.2.26'
  }
}

export const mongooseDeps: PackageVersions = {
  prod: {
    '@nestjs/mongoose': '^7.0.2',
    mongoose: '^5.10.6'
  },
  dev: {
    '@types/mongoose': '^5.7.36',
  }
}
