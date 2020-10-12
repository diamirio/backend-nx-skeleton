/** Input schema for schematic */
export interface Schema {
  items: AvailableBuilders[]
}

/** Available Builders */
export enum AvailableBuilders {
  TSC = 'tsc',
  TS_NODE_DEV = 'ts-node-dev'
}
