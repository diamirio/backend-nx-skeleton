import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  builder: {
    devDeps: {
      '@webundsoehne/nx-builders': '^2.1.5'
    }
  },
  base: {
    default: {
      deps: {
        '@nestjs/common': '^7.6.5',
        '@nestjs/core': '^7.6.5',
        '@nestjsx/crud': '^4.6.2',
        rxjs: '^6.6.3',
        'reflect-metadata': '^0.1.13',
        '@webundsoehne/nestjs-util': '^2.4.4',
        'class-transformer': '^0.3.1',
        'class-validator': '^0.12.2'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^7.6.5'
      }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      // pin for graphql version
      '@nestjs/platform-fastify': '7.2.0',
      'fastify-swagger': '^2.6.0',
      '@nestjs/swagger': '^4.6.0'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^7.9.4',
      '@nestjs/platform-fastify': '7.2.0',
      'apollo-server-fastify': '^2.19.1',
      graphql: '^15.4.0',
      'graphql-tools': '^7.0.2'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      'nest-schedule': '^0.6.4'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      'nestjs-command': '1.4.0'
    }
  },
  // if the support for per message queue support added this has to be done in a more complicated way
  [AvailableComponents.MICROSERVICE_SERVER]: {
    deps: {
      amqplib: '^0.6.0',
      'amqp-connection-manager': '^3.2.1'
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: '^0.6.0',
      'amqp-connection-manager': '^3.2.1'
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      '@nestjs/testing': '^7.6.5',
      jest: '^26.6.3',
      'ts-jest': '^26.4.4',
      '@types/jest': '^26.0.19'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^7.1.5',
      typeorm: '^0.2.29'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^7.2.0',
      mongoose: '^5.11.10'
    },
    devDeps: {
      '@types/mongoose': '^5.10.3'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: '^2.2.5'
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: '^8.5.1'
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
