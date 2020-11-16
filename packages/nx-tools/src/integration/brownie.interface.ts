/**
 * To integrate a application with brownie for further processing.
 */
export interface BrownieIntegrationInterface {
  // @TODO: will have to convert this to enum and get this from brownie
  /** Brownie available containers */
  containers?: BrownieAvailableContainers[]
}

/**
 * Available containers that is known by brownie.
 * It is here instead of brownie since it is an integration thingy as well as avoiding circular dependencies.
 */
export enum BrownieAvailableContainers {
  NX = 'nx',
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  MONGODB = 'mongodb',
  RABBITMQ = 'rabbitmq'
}
