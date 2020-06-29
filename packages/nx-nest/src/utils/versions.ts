import { VersionInterface } from './versions.interface'
// nx
export const nxVersion = '*'

// eslint
export const eslintPluginImportVersion = '2.20.2'

// base dependencies
export const baseDeps: VersionInterface = {
  prod: {
    '@nestjs/common': '^7.0.13',
    '@nestjs/core': '^7.0.13',
    '@nestjsx/crud': '^4.6.2',
    rxjs: '^6.5.5',
    'reflect-metadata': '^0.1.13',
    '@webundsoehne/nestjs-util': '^1.0.0',
    'class-transformer': '^0.2.3',
    'class-validator': '^0.12.2',
    'nest-schedule': '^0.6.3'
  },
  dev :{
    'ts-node-dev': '^1.0.0-pre.44',
    'tsconfig-paths': '^3.9.0'
  }
}

// server dependencies for rest
export const restServerDeps: VersionInterface = {
  prod: {
    '@nestjs/platform-fastify': '^7.0.13',
    'fastify-swagger': '^2.5.1',
    '@nestjs/swagger': '^4.5.7',
    cors: '^2.8.5'
  },
  dev: {
  }
}