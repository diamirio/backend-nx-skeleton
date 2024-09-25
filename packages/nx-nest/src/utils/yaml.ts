import type { Tree } from 'nx/src/generators/tree'
import type { CreateNodeOptions, DocumentOptions, ParseOptions, SchemaOptions, ToStringOptions } from 'yaml'
import { parseDocument, stringify } from 'yaml'
import type { Document } from 'yaml/dist/doc/Document'

export type YamlParseOptions = ParseOptions & DocumentOptions & SchemaOptions
export type YamlSerializeOptions = DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions & ToStringOptions

export function readYaml (tree: Tree, path: string, options?: YamlParseOptions): Document.Parsed {
  if (!tree.exists(path)) {
    throw new Error(`Cannot find ${path}`)
  }

  try {
    return parseDocument(tree.read(path, 'utf-8'), options)
  } catch (e) {
    throw new Error(`Cannot parse ${path}: ${e.message}`)
  }
}

export function writeYaml<T extends object = object> (tree: Tree, path: string, value: T, options?: YamlSerializeOptions): void {
  const serialized = stringify(value, options)

  tree.write(path, `${serialized}\n`)
}

export function updateYaml (tree: Tree, path: string, updater: (value: Document.Parsed) => void, options?: YamlParseOptions & YamlSerializeOptions): void {
  const document = readYaml(tree, path, options)

  updater(document)

  writeYaml(tree, path, document, options)
}
