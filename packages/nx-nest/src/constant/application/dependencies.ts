/* eslint-disable @typescript-eslint/naming-convention */
export const DEPENDENCIES = {
  '@nestjs/common': '^11',
  '@nestjs/core': '^11',
  '@webundsoehne/nestjs-util': '^7',
  'class-transformer': '^0.5',
  'class-validator': '^0.14',
  'js-yaml': '^4.1',
  'reflect-metadata': '^0.1',
  rxjs: '^7'
}

export const DEV_DEPENDENCIES = {
  '@nestjs/testing': '^11',
  '@webundsoehne/nx-executors': '^1.0.1'
}

export const SERVER_DEPENDENCIES = {
  '@fastify/static': '^8',
  '@fastify/swagger': '^9',
  '@nestjs/platform-fastify': '^11',
  '@nestjs/swagger': '^11',
  '@webundsoehne/nestjs-util-restful': '^3'
}

export const MICROSERVICE_DEPENDENCIES = {
  '@nestjs/microservices': '^11',
  '@webundsoehne/nestjs-util-microservices': '^3',
  'amqp-connection-manager': '^4.1.7',
  amqplib: '^0.10.7'
}

export const COMMAND_DEPENDENCIES = {
  'nest-commander': '^3'
}

export const BACKGROUND_TASK_DEPENDENCIES = {
  '@nestjs/schedule': '^6'
}
/* eslint-enable */

export const IMPLICIT_DEPENDENCIES = [
  '@fastify/static',
  '@fastify/swagger',
  'amqp-connection-manager',
  'amqplib',
  'class-transformer',
  'class-validator',
  'reflect-metadata',
  'rxjs'
]
