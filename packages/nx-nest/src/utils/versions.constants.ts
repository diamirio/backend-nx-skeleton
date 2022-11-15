import type { Versions } from './versions.interface'
import { AvailableComponents, AvailableDBAdapters, AvailableDBTypes, AvailableServerAdapters, AvailableServerTypes } from '@interfaces/available.constants'
import { AvailableTestsTypes } from '@webundsoehne/nx-tools'

export const VERSIONS: Versions = {
  base: {
    default: {
      deps: {
        ['@nestjs/common']: '^9',
        ['@nestjs/core']: '^9',
        rxjs: { version: '^7', implicit: true },
        ['@webundsoehne/nestjs-util']: { version: '^6', linkable: true },
        ['class-transformer']: { version: '^0.5.1', implicit: true },
        ['class-validator']: { version: '^0.13.2', implicit: true },
        ['reflect-metadata']: { version: '^0.1.13', implicit: true }
      }
    },
    microservice: {
      deps: {
        ['@nestjs/microservices']: '^9',
        ['@webundsoehne/nestjs-util-microservices']: { version: '^2', linkable: true }
      }
    },
    builder: {
      devDeps: {
        ['@webundsoehne/nx-builders']: { version: '^6', linkable: true }
      }
    }
  },
  [AvailableServerAdapters.EXPRESS]: {
    deps: {
      ['@nestjs/platform-express']: '^9',
      ['swagger-ui-express']: { version: '^4', implicit: true }
    }
  },
  [AvailableServerAdapters.FASTIFY]: {
    deps: {
      ['@nestjs/platform-fastify']: '^9',
      ['@fastify/swagger']: { version: '^7', implicit: true },
      ['@fastify/static']: { version: '^6', implicit: true }
    }
  },
  [AvailableServerTypes.RESTFUL]: {
    deps: {
      ['@nestjs/swagger']: '^6',
      ['@webundsoehne/nestjs-util-restful']: { version: '^2', linkable: true }
    }
  },
  [`${AvailableServerAdapters.EXPRESS}_${AvailableServerTypes.GRAPHQL}`]: {
    deps: {
      ['apollo-server-express']: { version: '^3', implicit: true }
    }
  },
  [`${AvailableServerAdapters.FASTIFY}_${AvailableServerTypes.GRAPHQL}`]: {
    deps: {
      ['apollo-server-fastify']: { version: '^3', implicit: true }
    }
  },
  [AvailableServerTypes.GRAPHQL]: {
    deps: {
      ['@nestjs/graphql']: '^10',
      ['@nestjs/apollo']: '^10',
      graphql: { version: '^16.6.0', implicit: true },
      ['graphql-tools']: { version: '^8', implicit: true },
      ['@webundsoehne/nestjs-util-graphql']: { version: '^2', linkable: true }
    }
  },
  [AvailableComponents.BG_TASK]: {
    deps: {
      ['@nestjs/schedule']: '^2'
    },
    devDeps: {
      ['@types/cron']: '^2'
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
      amqplib: { version: '^0.10.3', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.7', implicit: true }
    }
  },
  [AvailableComponents.MICROSERVICE_CLIENT]: {
    deps: {
      amqplib: { version: '^0.10.3', implicit: true },
      ['amqp-connection-manager']: { version: '^4.1.7', implicit: true }
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
      typeorm: { version: '^0.3.10', implicit: true },
      ['@webundsoehne/nestjs-seeder']: { version: '^2', linkable: true }
    }
  },
  [AvailableDBAdapters.MONGOOSE]: {
    deps: {
      ['@nestjs/mongoose']: '^9',
      mongoose: { version: '^6.6.4', implicit: true },
      ['@webundsoehne/nestjs-seeder']: { version: '^2', linkable: true }
    }
  },
  [AvailableDBTypes.TYPEORM_MYSQL]: {
    deps: {
      mysql2: { version: '^2.3.3', implicit: true }
    }
  },
  [AvailableDBTypes.TYPEORM_POSTGRESQL]: {
    deps: {
      pg: { version: '^8.8.0', implicit: true }
    }
  },
  [AvailableDBTypes.MONGOOSE_MONGODB]: {}
}
