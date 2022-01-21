import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        '@nestjs/common': '^8.2.5',
        '@nestjs/core': '^8.2.5',
        rxjs: '^7.5.2',
        '@webundsoehne/nestjs-util': '^4.0.0',
        'class-transformer': '^0.5.1',
        'class-validator': '^0.13.2'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^8.2.5'
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
      'fastify-swagger': '^4.13.1',
      '@nestjs/swagger': '^5.1.5'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^9.1.2',
      '@nestjs/platform-fastify': '^8.2.5',
      'apollo-server-fastify': '^3.6.2',
      graphql: '^15',
      'graphql-tools': '^8.2.0'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      'nest-schedule': '^0.6.4'
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
      amqplib: '^0.8.0',
      'amqp-connection-manager': '^4.0.0'
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: '^0.8.0',
      'amqp-connection-manager': '^4.0.0'
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
      typeorm: '^0.2.41',
      'typeorm-seeding': '^1.6.1'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^9.0.2',
      mongoose: '^6.0.17'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: '^2.3.3'
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: '^8.7.1'
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
