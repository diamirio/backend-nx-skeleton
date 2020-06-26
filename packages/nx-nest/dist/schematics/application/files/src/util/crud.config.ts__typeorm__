import { CrudConfigService } from '@nestjsx/crud'
import { ConfigService } from '@webundsoehne/nestjs-util'

import { CrudConfig } from './crud.interface'

const config: CrudConfig = ConfigService.get('crud')

CrudConfigService.load({
  query: {
    limit: 10,
    maxLimit: 100,
    cache: false
  },
  routes: {
    exclude: [ 'createManyBase' ],
    deleteOneBase: {
      returnDeleted: false
    }
  },
  ...config
})
