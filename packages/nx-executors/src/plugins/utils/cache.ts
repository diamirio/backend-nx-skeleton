import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { CreateNodesResult, TargetConfiguration } from '@nx/devkit'
import { readJsonFile, writeJsonFile } from '@nx/devkit'
import { hashObject } from 'nx/src/hasher/file-hasher'
import { workspaceDataDirectory } from 'nx/src/utils/cache-directory'

export type TargetCache = Record<string, Record<string, TargetConfiguration>>
export interface CacheInterface {
  cachePath: string
  targetsCache: Record<string, CreateNodesResult['projects']>
}

export function readTargetsCache(cachePath: string): CacheInterface['targetsCache'] {
  return process.env.NX_CACHE_PROJECT_GRAPH !== 'false' && existsSync(cachePath) ? readJsonFile(cachePath) : {}
}

export function writeTargetsToCache(cachePath: string, results: CacheInterface['targetsCache']): void {
  writeJsonFile(cachePath, results)
}

export function getCache<O extends object>(options: O, prefix: string): CacheInterface {
  const optionsHash = hashObject(options)
  const cachePath = join(workspaceDataDirectory, `${prefix}-${optionsHash}.hash`)
  const targetsCache = readTargetsCache(cachePath)

  return { cachePath, targetsCache }
}
