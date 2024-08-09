import type { Tree } from '@nx/devkit'
import { removeGenerator as removeGeneratorInternal } from '@nx/workspace/src/generators/remove/remove'

import type { RemoveGeneratorSchema } from './schema'

export default async function removeGenerator (tree: Tree, options: RemoveGeneratorSchema): Promise<void> {
  await removeGeneratorInternal(tree, options)
}
