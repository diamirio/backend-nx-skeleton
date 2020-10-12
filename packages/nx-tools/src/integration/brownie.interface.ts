/**
 * To integrate a application with brownie for further processing.
 */
export interface BrownieIntegrationInterface {
  // @TODO: will have to convert this to enum and get this from brownie
  /** Brownie available containers */
  containers?: ('nx' | 'postgresql' | 'mysql' | 'mongodb' | 'rabbitmq')[]
}
