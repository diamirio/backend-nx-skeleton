import { Versions } from './versions.interface'
import { AvailableDBTypes } from '@interfaces/index'
import { AvailableComponents, AvailableDBAdapters, AvailableServerTypes, AvailableTestsTypes } from '@src/interfaces'

export const VERSIONS: Versions = {
  builder: {},
  base: {
    default: {
      prod: {
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
      prod: {
        '@nestjs/microservices': '^7.4.4'
      }
    }
  },
  eslint: {
    devDependencies: {
      '@webundsoehne/eslint-config': '*',
      '@typescript-eslint/eslint-plugin': '^4.1.1',
      'eslint-plugin-import': '^2.22.0'
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    prod: {
      // pin for graphql version
      '@nestjs/platform-fastify': '7.2.0',
      'fastify-swagger': '^2.6.0',
      '@nestjs/swagger': '^4.6.0'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    prod: {
      '@nestjs/graphql': '^7.6.0',
      'apollo-server-fastify': '^2.17.0',
      graphql: '^15.3.0',
      'graphql-tools': '^6.2.3'
    }
  },
  [AvailableComponents.BG_TASK]: {
    prod: {
      'nest-schedule': '^0.6.4'
    }
  },
  [AvailableComponents.COMMAND]: {
    prod: {
      'nestjs-command': '1.4.0'
    }
  },
  [AvailableComponents.MICROSERVICE_SERVER]: {},
  [AvailableComponents.MICROSERVICE_CLIENT]: {},
  [AvailableTestsTypes.JEST]: {
    dev: {
      '@nestjs/testing': '^7.2.0',
      jest: '^26.1.0',
      'ts-jest': '^26.1.1',
      '@types/jest': '^26.0.3'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    prod: {
      '@nestjs/typeorm': '^7.1.4',
      typeorm: '^0.2.26'
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    prod: {
      '@nestjs/mongoose': '^7.0.2',
      mongoose: '^5.10.6'
    },
    dev: {
      '@types/mongoose': '^5.7.36'
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {},
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {},
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
