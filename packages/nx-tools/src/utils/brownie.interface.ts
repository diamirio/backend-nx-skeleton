export interface BrownieInterface {
  containers?: {
    [name: string]: BrownieIntegrationInterface['containers']
  }
}

export interface BrownieIntegrationInterface {
  package: string
  containers?: ('nx' | 'postgresql' | 'mysql' | 'mongodb')[]
}