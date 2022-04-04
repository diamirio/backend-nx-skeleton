import type { ArrayElement } from './array'

/**
 * Infers the object type.
 */
export type InferedObjectType<T extends Record<string, any>[], K extends keyof ArrayElement<T>> = ArrayElement<T>[K] extends infer ObjectProperty ? ObjectProperty : never

/**
 * Fetches the type of value of an object property if object is homogeneous.
 */
export type ValueOf<T> = T[keyof T]

/**
 * Makes the object deep partial.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * Removes the readonly properties from the object.
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

/**
 * Removes the readonly properties from the object recursively.
 */
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
