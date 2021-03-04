import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  builder: {
    devDeps: {
      '@webundsoehne/nx-builders': '^2.1.9'
    }
  },
  base: {
    default: {
      deps: {
        '@nestjs/common': '^7.6.13',
        '@nestjs/core': '^7.6.13',
        rxjs: '^6.6.6',
        'reflect-metadata': '^0.1.13',
        '@webundsoehne/nestjs-util': '^2.5.10',
        'class-transformer': '^0.4.0',
        'class-validator': '^0.13.1'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^7.6.13'
      }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      // pin for graphql version
      '@nestjs/platform-fastify': '^7.6.13',
      'fastify-swagger': '^4.3.3',
      '@nestjs/swagger': '^4.7.15'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      '@nestjs/graphql': '^7.9.11',
      '@nestjs/platform-fastify': '^7.6.13',
      'apollo-server-fastify': '^3.0.0-alpha.3',
      graphql: '^15.5.0',
      'graphql-tools': '^7.0.3'
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
      amqplib: '^0.7.0',
      'amqp-connection-manager': '^3.2.2'
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: '^0.7.0',
      'amqp-connection-manager': '^3.2.2'
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      '@nestjs/testing': '^7.6.13',
      jest: '^26.6.3',
      'ts-jest': '^26.5.3',
      '@types/jest': '^26.0.20'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^7.1.5',
      typeorm: '^0.2.31'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^7.2.4',
      mongoose: '^5.11.18'
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
