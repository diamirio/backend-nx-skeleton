export interface BrownieIntegrationInterface {
  name?: string
  containers?: ('nx' | 'postgresql' | 'mysql' | 'mongodb')[]
}