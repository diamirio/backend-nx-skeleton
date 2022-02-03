import type { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        '@nestjs/common': '^8.2.5',
        '@nestjs/core': '^8.2.5',
        rxjs: { version: '^7.5.2', implicit: true },
        '@webundsoehne/nestjs-util': '^4.0.0',
        'class-transformer': { version: '^0.5.1', implicit: true },
        'class-validator': { version: '^0.13.2', implicit: true },
        'reflect-metadata': { version: '^0.1.13', implicit: true }
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^8.2.5',
        '@webundsoehne/nestjs-util-microservices': '^1.0.0'
      }
    },
    builder: {
      devDeps: {
        '@webundsoehne/nx-builders': '^4.0.0'
      }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      '@nestjs/platform-fastify': '^8.2.5',
      'fastify-swagger': { version: '^4.13.1', implicit: true },
      '@nestjs/swagger': '^5.1.5',
      '@webundsoehne/nestjs-util-restful': '^1.0.0'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^9.1.2',
      '@nestjs/platform-fastify': '^8.2.5',
      'apollo-server-fastify': { version: '^3.6.2', implicit: true },
      graphql: { version: '^15', implicit: true },
      'graphql-tools': { version: '^8.2.0', implicit: true },
      '@webundsoehne/nestjs-util-graphql': '^1.0.0'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      '@nestjs/schedule': '^1.0.2'
    },
    devDeps: {
      '@types/cron': '^1.7.3'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      'nest-commander': '^2.3.5'
    }
  },
  // if the support for per message queue support added this has to be done in a more complicated way
  [AvailableComponents.MICROSERVICE_SERVER]: {
    deps: {
      amqplib: { version: '^0.8.0', implicit: true },
      'amqp-connection-manager': { version: '^4.0.0', implicit: true }
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: { version: '^0.8.0', implicit: true },
      'amqp-connection-manager': { version: '^4.0.0', implicit: true }
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      '@nestjs/testing': '^8.2.5',
      jest: '^27.4.7',
      'ts-jest': '^27.0.7',
      '@types/jest': '^27.1.3',
      'tsconfig-loader': '^1.1.0'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^8.0.3',
      typeorm: { version: '^0.2.41', implicit: true },
      'typeorm-seeding': { version: '^1.6.1', implicit: true }
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^9.0.2',
      mongoose: { version: '^6.0.17', implicit: true }
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: { version: '^2.3.3', implicit: true }
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: { version: '^8.7.1', implicit: true }
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
