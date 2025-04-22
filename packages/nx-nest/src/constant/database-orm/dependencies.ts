/* eslint-disable @typescript-eslint/naming-convention */
export const DEPENDENCIES_TYPEORM = {
  '@nestjs/typeorm': '^11',
  typeorm: '^0.3.22'
}

export const DEPENDENCIES_TYPEORM_MYSQL = {
  ...DEPENDENCIES_TYPEORM,
  mysql2: '^3.11.0'
}

export const DEPENDENCIES_TYPEORM_POSTGRES = {
  ...DEPENDENCIES_TYPEORM,
  pg: '^8.13.0'
}

export const DEPENDENCIES_MONGOOSE = {
  '@nestjs/mongoose': '^11',
  'migrate-mongo': '^12',
  mongoose: '^8'
}
