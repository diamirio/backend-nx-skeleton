import type { BrownieIntegration } from './brownie.interface'

interface Integration {
  brownie?: BrownieIntegration
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseIntegration<T extends Record<string, unknown> | null = null> = T extends null ? Partial<Integration> : Partial<T> & Partial<Integration>

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseNxJsonIntegration<T extends Record<string, unknown> | null = null> = T extends null ? {} : Partial<T>

export interface ProjectIntegration {
  name: string
  root: string
  sourceRoot: string
}
