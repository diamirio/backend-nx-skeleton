import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        '@nestjs/common': '^8.0.6',
        '@nestjs/core': '^8.0.6',
        rxjs: '^7.3.0',
        'reflect-metadata': '^0.1.13',
        '@webundsoehne/nestjs-util': '^4.0.0',
        'class-transformer': '^0.4.0',
        'class-validator': '^0.13.1'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^8.0.6'
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
      '@nestjs/platform-fastify': '^8.0.6',
      'fastify-swagger': '^4.9.0',
      '@nestjs/swagger': '^5.0.9'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^8.0.3',
      '@nestjs/platform-fastify': '^8.0.6',
      'apollo-server-fastify': '^3.1.2',
      graphql: '^15.5.1',
      'graphql-tools': '^8.1.0'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      'nest-schedule': '^0.6.4'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      'nestjs-command': '^2.0.1'
    }
  },
  // if the support for per message queue support added this has to be done in a more complicated way
  [AvailableComponents.MICROSERVICE_SERVER]: {
    deps: {
      amqplib: '^0.8.0',
      'amqp-connection-manager': '^3.2.2'
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: '^0.8.0',
      'amqp-connection-manager': '^3.2.2'
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      '@nestjs/testing': '^8.0.6',
      jest: '^27.0.6',
      'ts-jest': '^27.0.5',
      '@types/jest': '^27.0.1',
      'tsconfig-loader': '^1.1.0'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^8.0.2',
      typeorm: '^0.2.37',
      'typeorm-seeding': '^1.6.1'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^8.0.1',
      mongoose: '^5.13.7'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: '^2.3.0'
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: '^8.7.1'
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
