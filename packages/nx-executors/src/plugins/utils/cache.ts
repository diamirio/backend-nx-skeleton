import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { TargetConfiguration } from 'nx/src/config/workspace-json-project-json'
import { hashObject } from 'nx/src/hasher/file-hasher'
import type { CreateNodesResult } from 'nx/src/project-graph/plugins'
import { workspaceDataDirectory } from 'nx/src/utils/cache-directory'
import { readJsonFile, writeJsonFile } from 'nx/src/utils/fileutils'

export type TargetCache = Record<string, TargetConfiguration>
export interface CacheInterface {
  cachePath: string
  targetsCache: Record<string, CreateNodesResult['projects']>
}

export function readTargetsCache (cachePath: string): CacheInterface['targetsCache'] {
  return process.env.NX_CACHE_PROJECT_GRAPH !== 'false' && existsSync(cachePath) ? readJsonFile(cachePath) : {}
}

export function writeTargetsToCache (cachePath: string, results: CacheInterface['targetsCache']): void {
  writeJsonFile(cachePath, results)
}

export function getCache<O extends object> (options: O, prefix: string): CacheInterface {
  const optionsHash = hashObject(options)
  const cachePath = join(workspaceDataDirectory, `${prefix}-${optionsHash}.hash`)
  const targetsCache = readTargetsCache(cachePath)

  return { cachePath, targetsCache }
}
