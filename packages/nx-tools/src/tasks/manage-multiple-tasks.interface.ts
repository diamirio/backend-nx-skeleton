import type { SchematicContext, TaskId, Tree } from '@angular-devkit/schematics'

import type { ValueOf } from '@webundsoehne/ts-utility-types'

export interface Task<T extends Record<string, string>> {
  condition?: boolean
  token: ValueOf<T>
  fn: (host: Tree, context: SchematicContext, dependencies: TaskId[]) => TaskId
  dependsOn?: ValueOf<T>[]
}
