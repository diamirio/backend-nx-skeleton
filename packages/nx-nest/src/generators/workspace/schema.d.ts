import type { Database } from '../../constant'

export interface NestWorkspaceGeneratorSchema {
  name: string
  scope: string
  database: Database
  microserviceProvider: boolean
  skipPackageJson: boolean
  force: boolean
}
