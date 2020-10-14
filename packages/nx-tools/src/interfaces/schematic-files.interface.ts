/**
 * Schematic files to store conditional file and folder locations, where they can be part of the include statement in createApplicationRule.
 */
export interface SchematicFiles {
  [name: string]: {
    condition?: boolean
    files?: string[]
    folders?: string[]
  }
}
