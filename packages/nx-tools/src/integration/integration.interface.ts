import { BrownieIntegration } from './brownie.interface'
import { DeepPartial } from '@webundsoehne/ts-utility-types'

interface Integration {
  brownie?: BrownieIntegration
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseIntegration<T extends Record<string, any> = {}> = DeepPartial<T> & DeepPartial<Integration>
