import type { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        ['@nestjs/common']: '^9',
        ['@nestjs/core']: '^9',
        rxjs: { version: '^7', implicit: true },
        ['@webundsoehne/nestjs-util']: '^5',
        ['class-transformer']: { version: '^0.5.1', implicit: true },
        ['class-validator']: { version: '^0.13.2', implicit: true },
        ['reflect-metadata']: { version: '^0.1.13', implicit: true }
      }
    },
    microservice: {
      deps: {
        ['@nestjs/microservices']: '^9',
        ['@webundsoehne/nestjs-util-microservices']: '^1'
      }
    },
    builder: {
      devDeps: {
        ['@webundsoehne/nx-builders']: '^6.0.0'
      }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      ['@nestjs/platform-fastify']: '^9',
      ['@fastify/swagger']: { version: '^7', implicit: true },
      ['@fastify/static']: { version: '^6', implicit: true },
      ['@nestjs/swagger']: '^6',
      ['@webundsoehne/nestjs-util-restful']: '^1'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      ['@nestjs/graphql']: '^10',
      ['@nestjs/apollo']: '^10',
      ['@nestjs/platform-fastify']: '^9',
      ['apollo-server-fastify']: { version: '^3.10.0', implicit: true },
      graphql: { version: '^16.5.0', implicit: true },
      ['graphql-tools']: { version: '^8', implicit: true },
      ['@webundsoehne/nestjs-util-graphql']: '^1'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      ['@nestjs/schedule']: '^2'
    },
    devDeps: {
      ['@types/cron']: '^3'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      ['nest-commander']: '^3'
    }
  },
  // if the support for per message queue support added this has to be done in a more complicated way
  [AvailableComponents.MICROSERVICE_SERVER]: {
    deps: {
      amqplib: { version: '^0.10.1', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.3', implicit: true }
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: { version: '^0.10.1', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.3', implicit: true }
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      ['@nestjs/testing']: '^9',
      jest: '^28',
      ['ts-jest']: '^28',
      ['@types/jest']: '^28',
      ['tsconfig-loader']: '^1'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      ['@nestjs/typeorm']: '^9',
      typeorm: { version: '^0.3.7', implicit: true },
      ['typeorm-seeding']: { version: '^1.6.1', implicit: true }
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      ['@nestjs/mongoose']: '^9',
      mongoose: { version: '^6.5.1', implicit: true }
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: { version: '^2.3.3', implicit: true }
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: { version: '^8.7.3', implicit: true }
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
