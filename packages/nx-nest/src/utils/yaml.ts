import { join } from 'node:path'
import type { Tree } from 'nx/src/generators/tree'
import type { CreateNodeOptions, DocumentOptions, ParseOptions, SchemaOptions, ToStringOptions } from 'yaml'
import { Document, parseDocument, stringify, YAMLMap } from 'yaml'

export type YamlParseOptions = ParseOptions & DocumentOptions & SchemaOptions
export type YamlSerializeOptions = DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions & ToStringOptions

export function serializeYaml<T extends object = object> (value: T, options?: YamlSerializeOptions): string {
  return stringify(value, options)
}

export function readYaml (tree: Tree, path: string, options?: YamlParseOptions): Document {
  if (!tree.exists(path)) {
    throw new Error(`Cannot find ${path}`)
  }

  try {
    const content = tree.read(path, 'utf-8')

    return content.length ? parseDocument(content, options) : new Document(new YAMLMap(), options)
  } catch (e) {
    throw new Error(`Cannot parse ${path}: ${e.message}`)
  }
}

export function writeYaml<T extends object = object> (tree: Tree, path: string, value: T, options?: YamlSerializeOptions): void {
  const serialized = stringify(value, options)

  tree.write(path, `${serialized}\n`)
}

export function updateYaml (tree: Tree, path: string, updater: (value: Document) => void, options?: YamlParseOptions & YamlSerializeOptions): void {
  const document = readYaml(tree, path, options)

  updater(document)

  writeYaml(tree, path, document, options)
}

export function updateConfigFiles (tree: Tree, projectPath: string, key: string, defaultConfig: Record<string, any>, environmentConfig: Record<string, any>): void {
  updateYaml(tree, join(projectPath, 'config', 'default.yml'), (content) => {
    if (!content.has(key)) {
      const configName = content.createNode(key)
      const configContent = content.createNode(defaultConfig)

      configName.spaceBefore = true
      content.add({ key: configName, value: configContent })
    }

    return content
  })
  updateYaml(tree, join(projectPath, 'config', 'custom-environment-variables.yml'), (content) => {
    if (!content.has(key)) {
      const configName = content.createNode(key)
      const configContent = content.createNode(environmentConfig)

      configName.spaceBefore = true
      content.add({ key: configName, value: configContent })
    }

    return content
  })
}
