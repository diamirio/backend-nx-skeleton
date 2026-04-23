import { DEPENDENCY_VERSIONS } from '../dependencies'

export const DEPENDENCIES = {
  '@diamir/nestjs-config': DEPENDENCY_VERSIONS['@diamir/nestjs-config'],
  '@diamir/nestjs-logger': DEPENDENCY_VERSIONS['@diamir/nestjs-logger'],
  '@nestjs/common': DEPENDENCY_VERSIONS['@nestjs/common'],
  '@nestjs/core': DEPENDENCY_VERSIONS['@nestjs/core'],
  'class-transformer': DEPENDENCY_VERSIONS['class-transformer'],
  'class-validator': DEPENDENCY_VERSIONS['class-validator'],
  'js-yaml': DEPENDENCY_VERSIONS['js-yaml'],
  'reflect-metadata': DEPENDENCY_VERSIONS['reflect-metadata'],
  rxjs: DEPENDENCY_VERSIONS.rxjs
}

export const DEV_DEPENDENCIES = {
  '@nestjs/testing': DEPENDENCY_VERSIONS['@nestjs/testing'],
  '@diamir/nx-executors': DEPENDENCY_VERSIONS['@diamir/nx-executors']
}

export const SERVER_DEPENDENCIES = {
  '@diamir/nestjs-process': DEPENDENCY_VERSIONS['@diamir/nestjs-process'],
  '@diamir/nestjs-util-restful': DEPENDENCY_VERSIONS['@diamir/nestjs-util-restful'],
  '@diamir/nestjs-maintenance': DEPENDENCY_VERSIONS['@diamir/nestjs-maintenance'],
  '@fastify/static': DEPENDENCY_VERSIONS['@fastify/static'],
  '@fastify/swagger': DEPENDENCY_VERSIONS['@fastify/swagger'],
  '@nestjs/platform-fastify': DEPENDENCY_VERSIONS['@nestjs/platform-fastify'],
  '@nestjs/swagger': DEPENDENCY_VERSIONS['@nestjs/swagger']
}

export const MICROSERVICE_DEPENDENCIES = {
  '@diamir/nestjs-microservice': DEPENDENCY_VERSIONS['@diamir/nestjs-microservice'],
  '@nestjs/microservices': DEPENDENCY_VERSIONS['@nestjs/microservices'],
  'amqp-connection-manager': DEPENDENCY_VERSIONS['amqp-connection-manager'],
  amqplib: DEPENDENCY_VERSIONS.amqplib
}

export const COMMAND_DEPENDENCIES = {
  'nest-commander': DEPENDENCY_VERSIONS['nest-commander']
}

export const BACKGROUND_TASK_DEPENDENCIES = {
  '@diamir/nestjs-maintenance': DEPENDENCY_VERSIONS['@diamir/nestjs-maintenance'],
  '@diamir/nestjs-retry': DEPENDENCY_VERSIONS['@diamir/nestjs-retry'],
  '@nestjs/schedule': DEPENDENCY_VERSIONS['@nestjs/schedule']
}
