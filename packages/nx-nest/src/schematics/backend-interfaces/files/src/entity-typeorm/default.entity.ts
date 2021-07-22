import { Column, Entity } from 'typeorm'

import { BaseEntityWithPrimary } from './util'

@Entity('DefaultTypeormEntity')
export class DefaultTypeormEntity extends BaseEntityWithPrimary<DefaultTypeormEntity> {
  @Column('varchar', { length: 120 })
  dummy: string
}
