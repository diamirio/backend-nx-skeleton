import type { Seed } from './seed'

export type Seeds = Record<PropertyKey, new (...args: any[]) => Seed>
