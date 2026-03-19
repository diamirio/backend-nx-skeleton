export const DEPENDENCIES_TYPEORM = {
  '@nestjs/typeorm': '11.0.0',
  typeorm: '0.3.28'
}

export const DEPENDENCIES_TYPEORM_MYSQL = {
  ...DEPENDENCIES_TYPEORM,
  mysql2: '3.15.0'
}

export const DEPENDENCIES_TYPEORM_POSTGRES = {
  ...DEPENDENCIES_TYPEORM,
  pg: '8.16.3'
}

export const DEPENDENCIES_MONGOOSE = {
  '@nestjs/mongoose': '11.0.3',
  'migrate-mongo': '12.1.3',
  mongoose: '8.18.2'
}
