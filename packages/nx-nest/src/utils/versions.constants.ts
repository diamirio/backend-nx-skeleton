import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        '@nestjs/common': '^8.0.3',
        '@nestjs/core': '^8.0.3',
        rxjs: '^7.2.0',
        'reflect-metadata': '^0.1.13',
        '@webundsoehne/nestjs-util': '^3.0.5',
        'class-transformer': '^0.4.0',
        'class-validator': '^0.13.1'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^8.0.3'
      }
    },
    builder: {
      devDeps: {
        '@webundsoehne/nx-builders': '^3.4.9'
      }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      '@nestjs/platform-fastify': '^8.0.3',
      'fastify-swagger': '^4.8.3',
      '@nestjs/swagger': '^5.0.3'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^8.0.2',
      '@nestjs/platform-fastify': '^8.0.3',
      'apollo-server-fastify': '^3.0.0',
      graphql: '^15.5.1',
      'graphql-tools': '^7.0.5'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      'nest-schedule': '^0.6.4'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      'nestjs-command': '^2.0.0'
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
      '@nestjs/testing': '^8.0.3',
      jest: '^27.0.6',
      'ts-jest': '^27.0.3',
      '@types/jest': '^26.0.24',
      'tsconfig-loader': '^1.1.0'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^8.0.1',
      typeorm: '^0.2.34',
      'typeorm-seeding': '^1.6.1'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^8.0.0',
      mongoose: '^5.13.2'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: '^2.2.5'
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: '^8.6.0'
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
