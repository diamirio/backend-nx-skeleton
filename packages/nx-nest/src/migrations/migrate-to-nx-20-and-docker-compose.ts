import type { Tree } from '@nx/devkit'
import { formatFiles, logger } from '@nx/devkit'
import { prompt } from 'enquirer'
import { readJson } from 'nx/src/generators/utils/json'

import { Database, DatabaseOrm } from '../constant'
import { DOCKER_DB_SERVICE } from '../constant/database-orm'
import { DOCKER_IMAGE as MSP_DOCKER_IMAGE } from '../constant/microservice-provider'
import { writeYaml } from '../utils'

export default async function (tree: Tree): Promise<void> {
  if (!tree.exists('nx.json')) {
    logger.warn('No `nx.json` found, skipping migration ...')

    return
  }

  if (tree.exists('docker-compose.yml') || tree.exists('docker-compose.yaml')) {
    logger.warn('Found an existing docker-compose file, skipping ...')

    return
  }

  const integration = readJson(tree, 'nx.json')?.integration
  const services: Record<string, any> = {}
  let hasDb = false
  let hasMq = false

  if (integration?.orm) {
    logger.log('Found Orm, adding db to docker-compose')

    if (integration.orm.database === DatabaseOrm.MONGOOSE) {
      logger.log('Found Mongoose, adding mongo as db')

      services.db = DOCKER_DB_SERVICE[Database.MONGO]
      hasDb = true
    } else if (integration.orm.database === DatabaseOrm.TYPEORM) {
      logger.log('Found Typeorm for db setup')

      const db = (
        await prompt<{ database?: Database }>({
          type: 'autocomplete',
          name: 'database',
          message: 'Please select a database:',
          choices: [Database.MYSQL, Database.POSTGRES, 'other']
        })
      ).database

      if (db !== Database.OTHER) {
        services.db = DOCKER_DB_SERVICE[db]
        hasDb = true
      }
    }
  }

  if (integration?.msp) {
    logger.log('Found MSP, adding rabbitmq to docker-compose')
    services.rabbitmq = { image: MSP_DOCKER_IMAGE }
    hasMq = true
  }

  const nxService: Record<string, any> = {
    image: 'node:20-alpine',
    ports: ['3000:3000'],
    working_dir: '/opt/workspace',
    volumes: ['.:/opt/workspace', 'nx_cache:/opt/workspace/.nx'],
    command: 'npm run start'
  }

  if (hasDb) {
    nxService.depends_on = ['db']
  }

  if (hasMq) {
    nxService.depends_on = [...nxService.depends_on ?? [], 'rabbitmq']
  }

  writeYaml(tree, 'service-docker-compose.yml', { services })
  writeYaml(tree, 'docker-compose.yml', {
    include: ['service-docker-compose.yml'],
    services: {
      nx: nxService
    },
    volumes: ['nx_cache:']
  })

  await formatFiles(tree)
}
