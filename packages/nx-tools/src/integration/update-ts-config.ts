import { Rule } from '@angular-devkit/schematics'
import { updateJsonInTree } from '@nrwl/workspace'

export function updateTsconfigPaths<T extends { packageName: string, sourceRoot: string, root: string }> (options: T): Rule {
  return updateJsonInTree('tsconfig.base.json', (json) => {
    json.compilerOptions.paths[options.packageName] = [ `${options.root}/${options.sourceRoot}/index` ]
    return json
  })
}
