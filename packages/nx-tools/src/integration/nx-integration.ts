/* eslint-disable no-underscore-dangle */
import { Tree as AngularTree } from '@angular-devkit/schematics'
import { getWorkspaceLayout, Tree as NxTree } from '@nrwl/devkit'
import rewire from 'rewire'

const base = rewire('@nrwl/devkit/src/utils/invoke-nx-generator')

const DevkitTreeFromAngularDevkitTree: new (host: AngularTree, root: string) => NxTree = base.__get__('DevkitTreeFromAngularDevkitTree')

export function convertAngularTreeToNxTree (host: AngularTree, root?: string): NxTree {
  return new DevkitTreeFromAngularDevkitTree(host, root ?? host.root.path)
}

export function readWorkspaceLayout (host: AngularTree): ReturnType<typeof getWorkspaceLayout> {
  return getWorkspaceLayout(convertAngularTreeToNxTree(host))
}
