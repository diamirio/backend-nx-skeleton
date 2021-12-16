import { BrownieIntegrationInterface } from './brownie.interface'

interface Integration {
  brownie: BrownieIntegrationInterface
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseIntegration<T extends Record<string, any> = {}> = T & Integration
