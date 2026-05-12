import { Database, DatabaseOrm } from '../database.enum'

interface DatabaseConfig {
  defaultConfig: Record<string, any>
  environmentConfig: Record<string, string>
  forRoot: string
  moduleClass: string
  importPath: string
}

export const DATABASE_CONFIG_KEY = 'database'
export const DATABASE_HOST_ENV_VAR = 'DATABASE_HOST'

export function getDatabaseConfig(options: { database?: Database; orm?: DatabaseOrm }): DatabaseConfig {
  const environmentConfig = getEnvironmentConfig(options.orm)

  if (options.orm === DatabaseOrm.TYPEORM) {
    return {
      defaultConfig: getTypeormConfig(options.database),
      environmentConfig,
      forRoot: 'TypeOrmModule.forRoot(getDatabaseOptions())',
      moduleClass: 'TypeOrmModule',
      importPath: '@nestjs/typeorm'
    }
  }

  if (options.orm === DatabaseOrm.MONGOOSE) {
    return {
      defaultConfig: getMongooseConfig(),
      environmentConfig,
      forRoot: 'MongooseModule.forRoot(...getDatabaseOptions())',
      moduleClass: 'MongooseModule',
      importPath: '@nestjs/mongoose'
    }
  }
}

function getTypeormConfig(database: Database): Record<string, any> {
  const type =
    database === Database.MYSQL ? 'mysql' : database === Database.POSTGRES ? 'postgres' : '# @todo: set driver'
  const port = database === Database.MYSQL ? 3306 : database === Database.POSTGRES ? 5432 : '# @todo: set port'

  return {
    host: 'localhost',
    port,
    database: 'db',
    username: 'user',
    password: 'secret',
    type,
    synchronize: false,
    cache: false,
    logging: false,
    keepConnectionAlive: true,
    migrationsTableName: '_migrations',
    invalidWhereValuesBehavior: {
      null: 'throw',
      undefined: 'throw'
    }
  }
}

function getMongooseConfig(): Record<string, any> {
  return {
    host: 'localhost',
    port: 27017,
    database: 'db',
    username: 'user',
    password: 'secret',
    ignoreUndefined: true,
    connectionString: null,
    migration: {
      migrationFileExtension: '.js',
      useFileHash: false,
      moduleSystem: 'commonjs'
    }
  }
}

function getEnvironmentConfig(orm: DatabaseOrm): Record<string, any> {
  const config: ReturnType<typeof getEnvironmentConfig> = {
    host: DATABASE_HOST_ENV_VAR,
    port: 'DATABASE_PORT',
    database: 'DATABASE_NAME',
    username: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD'
  }

  if (orm === DatabaseOrm.MONGOOSE) {
    config.connectionString = 'DATABASE_CONNECTION_STRING'
  }

  return config
}
