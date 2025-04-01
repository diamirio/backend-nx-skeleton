import { Database, DatabaseOrm } from '../database.enum'

interface DatabaseConfig {
  defaultConfig: Record<string, any>
  environmentConfig: Record<string, string>
  forRoot: string
  moduleClass: string
  importPath: string
}

export const DATABASE_CONFIG_KEY = 'database'

export function getDatabaseConfig (options: { database?: Database, orm?: DatabaseOrm }): DatabaseConfig {
  const environmentConfig = getEnvironmentConfig()

  if (options.orm === DatabaseOrm.TYPEORM) {
    return {
      defaultConfig: getTypeormConfig(options.database),
      environmentConfig,
      forRoot: 'TypeOrmModule.forRoot(getDatabaseOptions())',
      moduleClass: 'TypeOrmModule',
      importPath: '@nestjs/typeorm'
    }
  } else if (options.orm === DatabaseOrm.MONGOOSE) {
    return {
      defaultConfig: getMongooseConfig(),
      environmentConfig,
      forRoot: 'MongooseModule.forRoot(...getDatabaseOptions())',
      moduleClass: 'MongooseModule',
      importPath: '@nestjs/mongoose'
    }
  }
}

function getTypeormConfig (database: Database): Record<string, any> {
  const type = database === Database.MYSQL ? 'mysql' : database === Database.POSTGRES ? 'postgres' : '# @todo: set driver'
  const port = database === Database.MYSQL ? 3306 : database === Database.POSTGRES ? 5432 : '# @todo: set port'

  return {
    database: 'db',
    username: 'user',
    password: 'secret',
    host: 'db',
    type,
    port,
    synchronize: false,
    cache: false,
    keepConnectionAlive: true,
    migrationsTableName: '_migrations'
  }
}

function getMongooseConfig (): Record<string, any> {
  return {
    host: 'db',
    port: 27017,
    database: 'db',
    username: 'user',
    password: 'secret',
    ignoreUndefined: true,
    migration: {
      migrationFileExtension: '.js',
      useFileHash: false,
      moduleSystem: 'commonjs'
    }
  }
}

function getEnvironmentConfig (): Record<string, any> {
  return {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    database: 'DATABASE_NAME',
    username: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD'
  }
}
