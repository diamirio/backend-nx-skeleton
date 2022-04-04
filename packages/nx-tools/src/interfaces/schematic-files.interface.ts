/**
 * Schematic files to store conditional file and folder locations, where they can be part of the include statement in createApplicationRule.
 */
export type SchematicFiles = Record<
string,
{
  condition?: boolean
  files?: string[]
  folders?: string[]
}
>
