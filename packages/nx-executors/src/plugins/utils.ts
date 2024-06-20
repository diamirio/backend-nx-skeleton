import { existsSync } from 'node:fs'
import type { CreateNodesResult } from 'nx/src/project-graph/plugins'
import { readJsonFile, writeJsonFile } from 'nx/src/utils/fileutils'

export function readTargetsCache (cachePath: string): Record<string, CreateNodesResult['projects']> {
  return process.env.NX_CACHE_PROJECT_GRAPH !== 'false' && existsSync(cachePath) ? readJsonFile(cachePath) : {}
}

export function writeTargetsToCache (cachePath: string, results: Record<string, CreateNodesResult['projects']>): void {
  writeJsonFile(cachePath, results)
}
