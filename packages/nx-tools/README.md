<p align="center">
  <a href="https://webundsoehne.com" target="blank">
    <img src="https://webundsoehne.com/wp-content/uploads/webundsoehne-logo.png" width="320" alt="Web und Söhne - Logo" />
  </a>
</p>
Web & Söhne is Austria's leading expert in programming and implementing complex and large web projects.

---

# @webundsoehne/nx-tools

[![Version](https://img.shields.io/npm/v/@webundsoehne/nx-tools.svg)](https://npmjs.org/package/@webundsoehne/nx-tools) [![Downloads/week](https://img.shields.io/npm/dw/@webundsoehne/nx-tools.svg)](https://npmjs.org/package/@webundsoehne/nx-tools) [![Dependencies](https://img.shields.io/librariesio/release/npm/@webundsoehne/nx-tools)](https://npmjs.org/package/@webundsoehne/nx-tools) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Description

This package includes [@nrwl/nx](https://github.com/nrwl/nx) some tools to be commonly used in the schematics.

All the functions are imported from the root of the project.

- **[Read The API Documentation](./docs/README.md)**
- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [Tools](#tools)
- [Schematics](#schematics)
  - [Generate Exports](#generate-exports)
  - [Generic Generator](#generic-generator)

<!-- tocstop -->

---

# Tools

This library mostly compromises of tools that are useful for generating schematics. All the generic methods and types that is usually used in schematics are exported from the root of the package. You can read the generated API documentation for further explanation of individual functionality.

# Schematics

## Generate Exports

This schematic can be used for other schematics to generate exports based on designated patterns.

After parsing through your rules, you can add this as an individual role to go through all the files and match designated patterns and create TypeScript exported modules of matching files. All paths will be relative.

There is two use cases for this:

- Internal processing
  > This will parse your files in your tree you defined and only export them, and does not care about the real files on host. To achieve this, this rule has to come before "mergeWith" function of tree with physical files.
- External processing
  > To achieve this, this rule has to come after "mergeWith". Schematic will go through the whole real file base supplied as a tree and match the files on the physical file system as well.

**Example:**

```typescript
import { Schema as ExportsSchema } from '@webundsoehne/nx-tools/dist/schematics/exports/main.interface'

export async function createApplicationFiles(options: NormalizedSchema, context: SchematicContext): Promise<Rule> {
  return chain([
    /** Your chain */
    /** Your chain */
    /** Your chain */

    externalSchematic<ExportsSchema>('@webundsoehne/nx-tools', 'exports', {
      silent: true,
      skipFormat: true,
      templates: {
        root: options.root,
        templates: [
          {
            cwd: options.root,
            output: 'index.ts',
            pattern: '**/*.module.ts'
          }
        ]
      }
    })
  ])
}
```

Through the cli it will prompt you to select an output file and and a pattern to automatically export everything with the given glob pattern.

## Generic Generator

Generic generator is a generic library that allows to create a basic generator library that can work in either in the root or current working directory. It will generate the files selected on the type.

- Create your schema from the generator.

  ```typescript
  // main.ts
  import { generateGenericGenerator } from '@webundsoehne/nx-tools/dist/schematics/generator/main'
  import { join } from 'path'

  /**
   * @param  {Schema} schema
   * The schematic itself.
   */
  export default generateGenericGenerator(join(__dirname, './files'))
  ```

- Extend the interfaces from the base rule.

  ```typescript
  // main.interface.ts
  import { Schema as BaseSchema, NormalizedSchema as BaseNormalizedSchema } from '@webundsoehne/nx-tools/dist/schematics/generator/main.interface'

  import { AvailableGenerators } from '@src/interfaces'

  type TypedBaseSchema = BaseSchema<AvailableGenerators>
  type TypedBaseNormalizedSchema = BaseNormalizedSchema<{ test: boolean }, AvailableGenerators>

  export { TypedBaseSchema as Schema, TypedBaseNormalizedSchema as NormalizedSchema }
  ```

- Create your schema.json for nx.

- Add your files in to the given files directory in subfolders with the names of generators.

- Add `description.txt`, if you want to have hint in the type selection prompt.

- Add extra prompts if you want to inject stuff to template. Prompt options are available [here](https://github.com/cenk1cenk2/listr2/blob/master/src/utils/prompt.interface.ts). Give every prompt `name` property to access it like `inject[name]` in jinja templating. If there is a single prompt it will be just on the `inject` property.

  ```json
  // prompts.json
  [
    { "type": "Input", "name": "test", "message": "test" },
    { "type": "Input", "name": "test2", "message": "test" }
  ]
  ```
