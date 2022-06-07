import type { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        ['@nestjs/common']: '^8.4.6',
        ['@nestjs/core']: '^8.4.6',
        rxjs: { version: '^7.5.5', implicit: true },
        ['@webundsoehne/nestjs-util']: '^5.5.1',
        ['class-transformer']: { version: '^0.5.1', implicit: true },
        ['class-validator']: { version: '^0.13.2', implicit: true },
        ['reflect-metadata']: { version: '^0.1.13', implicit: true }
      }
    },
    microservice: {
      deps: {
        ['@nestjs/microservices']: '^8.4.6',
        ['@webundsoehne/nestjs-util-microservices']: '^1.3.4'
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
      ['@nestjs/platform-fastify']: '^8.4.6',
      ['fastify-swagger']: { version: '^5.2.0', implicit: true },
      ['@nestjs/swagger']: '^5.2.0',
      ['@webundsoehne/nestjs-util-restful']: '^1.4.2'
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      ['@nestjs/graphql']: '^10.0.15',
      ['@nestjs/apollo']: '^10.0.14',
      ['@nestjs/platform-fastify']: '^8.4.6',
      ['apollo-server-fastify']: { version: '^3.8.2', implicit: true },
      graphql: { version: '^16.5.0', implicit: true },
      ['graphql-tools']: { version: '^8.2.11', implicit: true },
      ['@webundsoehne/nestjs-util-graphql']: '^1.3.4'
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      ['@nestjs/schedule']: '^2.0.1'
    },
    devDeps: {
      ['@types/cron']: '^2.0.0'
    }
  },
  [AvailableComponents.COMMAND]: {
    deps: {
      ['nest-commander']: '^2.5.0'
    }
  },
  // if the support for per message queue support added this has to be done in a more complicated way
  [AvailableComponents.MICROSERVICE_SERVER]: {
    deps: {
      amqplib: { version: '^0.10.0', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.3', implicit: true }
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: { version: '^0.10.0', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.3', implicit: true }
    }
  },
  [AvailableTestsTypes.JEST]: {
    devDeps: {
      ['@nestjs/testing']: '^8.4.6',
      jest: '^28.1.1',
      ['ts-jest']: '^28.0.4',
      ['@types/jest']: '^28.1.1',
      ['tsconfig-loader']: '^1.1.0'
    }
  },
  [AvailableDBAdapters.TYPEORM]: {
    deps: {
      ['@nestjs/typeorm']: '^8.1.12',
      typeorm: { version: '^0.3.6', implicit: true },
      ['typeorm-seeding']: { version: '^1.6.1', implicit: true }
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      ['@nestjs/mongoose']: '^9.1.0',
      mongoose: { version: '^6.3.5', implicit: true }
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
