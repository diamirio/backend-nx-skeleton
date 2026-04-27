import { DEPENDENCY_VERSIONS } from '../dependencies'

export const DEPENDENCIES_TYPEORM = {
  '@diamir/nestjs-config': DEPENDENCY_VERSIONS['@diamir/nestjs-config'],
  '@nestjs/swagger': DEPENDENCY_VERSIONS['@nestjs/swagger'],
  '@nestjs/typeorm': DEPENDENCY_VERSIONS['@nestjs/typeorm'],
  typeorm: DEPENDENCY_VERSIONS.typeorm
}

export const DEPENDENCIES_TYPEORM_MYSQL = {
  ...DEPENDENCIES_TYPEORM,
  mysql2: DEPENDENCY_VERSIONS.mysql2
}

export const DEPENDENCIES_TYPEORM_POSTGRES = {
  ...DEPENDENCIES_TYPEORM,
  pg: DEPENDENCY_VERSIONS.pg
}

export const DEPENDENCIES_MONGOOSE = {
  '@diamir/nestjs-config': DEPENDENCY_VERSIONS['@diamir/nestjs-config'],
  '@nestjs/mongoose': DEPENDENCY_VERSIONS['@nestjs/mongoose'],
  'migrate-mongo': DEPENDENCY_VERSIONS['migrate-mongo'],
  mongoose: DEPENDENCY_VERSIONS.mongoose
}
