import { Column, Entity } from 'typeorm'

import { BaseEntityWithPrimary } from './util'

@Entity('DefaultEntity')
export class DefaultEntity extends BaseEntityWithPrimary<DefaultEntity> {
  @Column('varchar', { length: 120 })
  dummy: string

  @Column('varchar')
  dummythingy: string
}
