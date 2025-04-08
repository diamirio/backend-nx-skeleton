import { Database } from '../database.enum'

export const DOCKER_SERVICE_NAME = 'db'

const IMAGE_MYSQL = 'mysql:8'
const IMAGE_POSTGRES = 'postgres:16-alpine'
const IMAGE_MONGO = 'mongo:7'

export const DOCKER_DB_VOLUME = {
  [Database.MYSQL]: 'db-mysql',
  [Database.POSTGRES]: 'db-postgres',
  [Database.MONGO]: 'db-mongo'
}

export const DOCKER_DB_SERVICE = {
  [Database.MYSQL]: {
    image: IMAGE_MYSQL,
    environment: {
      MYSQL_USER: 'user',
      MYSQL_PASSWORD: 'secret',
      MYSQL_ROOT_PASSWORD: 'secret',
      MYSQL_DATABASE: 'db'
    },
    ports: ['3306:3306'],
    volumes: [`${DOCKER_DB_VOLUME[Database.MYSQL]}:/var/lib/mysql`]
  },
  [Database.POSTGRES]: {
    image: IMAGE_POSTGRES,
    environment: {
      POSTGRES_USER: 'user',
      POSTGRES_PASSWORD: 'secret',
      POSTGRES_DB: 'db'
    },
    ports: ['5432:5432'],
    volumes: [`${DOCKER_DB_VOLUME[Database.POSTGRES]}:/var/lib/postgresql/data`]
  },
  [Database.MONGO]: {
    image: IMAGE_MONGO,
    environment: {
      MONGO_INITDB_ROOT_USERNAME: 'root',
      MONGO_INITDB_ROOT_PASSWORD: 'secret',
      MONGO_INITDB_DATABASE: 'db',
      MONGO_USERNAME: 'user',
      MONGO_PASSWORD: 'secret'
    },
    ports: ['27017:27017'],
    command: '--directoryperdb',
    volumes: ['./.docker/init-mongodb.js:/docker-entrypoint-initdb.d/init-mongodb.js:ro', `${DOCKER_DB_VOLUME[Database.MONGO]}:/data/db`]
  }
}
