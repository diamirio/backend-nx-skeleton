import { ArrayElement } from './array'

export type InferedObjectType<T extends Record<string, any>[], K extends keyof ArrayElement<T>> = ArrayElement<T>[K] extends infer ObjectProperty ? ObjectProperty : never

export type ValueOf<T> = T[keyof T]

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
