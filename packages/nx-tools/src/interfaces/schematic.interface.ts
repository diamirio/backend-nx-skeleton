import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

export type SchematicRule = (host: Tree, context: SchematicContext) => Rule | Promise<Rule>
