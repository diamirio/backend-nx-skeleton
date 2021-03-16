import type { Connection } from 'typeorm'

export interface Context {
  requestId: string
  typeormGetConnection?: () => Connection
}
