import { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes, AvailableTestsTypes } from '@interfaces/available.constants'

export const VERSIONS: Versions = {
  builder: {
    devDeps: {
      '@webundsoehne/nx-builders': '^1.2.0'
    }
  },
  base: {
    default: {
      deps: {
        '@nestjs/common': '^7.4.4',
        '@nestjs/core': '^7.4.4',
        '@nestjsx/crud': '^4.6.2',
        rxjs: '^6.6.3',
        'reflect-metadata': '^0.1.13',
        '@webundsoehne/nestjs-util': '^1.0.0',
        'class-transformer': '^0.3.1',
        'class-validator': '^0.12.2'
      }
    },
    microservice: {
      deps: {
        '@nestjs/microservices': '^7.4.4'
      }
    }
  },
  eslint: {
    dependencies: {},
    devDependencies: {
      '@webundsoehne/eslint-config': '^1.1.0',
      '@typescript-eslint/eslint-plugin': '^4.1.1',
      'eslint-plugin-import': '^2.22.0'
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
      '@nestjs/graphql': '^7.6.0',
      'apollo-server-fastify': '^2.17.0',
      graphql: '^15.3.0',
      'graphql-tools': '^6.2.3'
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
      '@nestjs/testing': '^7.2.0',
      jest: '^26.1.0',
      'ts-jest': '^26.1.1',
      '@types/jest': '^26.0.3'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      '@nestjs/typeorm': '^7.1.4',
      typeorm: '^0.2.26'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      '@nestjs/mongoose': '^7.0.2',
      mongoose: '^5.10.6'
    },
    devDeps: {
      '@types/mongoose': '^5.7.36'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {},
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {},
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
