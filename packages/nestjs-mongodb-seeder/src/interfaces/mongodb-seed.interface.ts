import type { Connection } from 'mongoose'

import type { MongoDBSeed } from './mongodb-seed'

export type MongoDBSeeds = Record<PropertyKey, new (connection: Connection) => MongoDBSeed>
