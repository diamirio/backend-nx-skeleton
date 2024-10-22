/* eslint-disable @typescript-eslint/naming-convention */
export const DEPENDENCIES_TYPEORM = {
  '@nestjs/typeorm': '^10',
  '@webundsoehne/nestjs-seeder': '^2',
  typeorm: '^0.3.20'
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
  '@nestjs/mongoose': '^10',
  '@webundsoehne/nestjs-seeder': '^2',
  'migrate-mongo': '^11.0.0',
  mongoose: '^8'
}
