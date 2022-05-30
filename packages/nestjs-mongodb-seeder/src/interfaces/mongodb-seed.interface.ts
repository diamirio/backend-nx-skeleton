import type { MongoDBSeed } from './mongodb-seed'

export type MongoDBSeeds = Record<PropertyKey, new (...args: any[]) => MongoDBSeed>
