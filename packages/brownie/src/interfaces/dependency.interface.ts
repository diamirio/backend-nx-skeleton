export type NodeDependency = string | CommonNodeDependency

export interface CommonNodeDependency {
  pkg: string
  registry?: string
  version?: string
  latest?: string
}
