import { ConfigService } from '@webundsoehne/nestjs-util'

const { mock: mockOptions = {}, directories, ...options } = ConfigService.get('database')

const databaseOptions = {
  ...options,
  entities: [ directories.entity ],
  migrations: [ `./${directories.migration}/*{.ts,.js}` ],
  cli: {
    entitiesDir: directories.entity,
    migrationsDir: `./${directories.migration}`
  },
  seeds: [ `./${directories.seed}/**/*.seed{.ts,.js}` ],
  factories: [ `./${directories.seed}/**/*.factory{.ts,.js}` ]
}

export function getDatabaseOptions (mock = false) {
  return mock ? { ...databaseOptions, ...mockOptions } : databaseOptions
}
