/* eslint-disable @typescript-eslint/naming-convention */

export interface LocalLockFile {
  [LocalLockPaths.DOCKER_HELPER]: Record<string, Partial<Record<DockerHelperLock, string[]>>>
}

export enum DockerHelperLock {
  DIRECTORIES = 'configuration',
  VOLUMES = 'volumes',
  FILES = 'files'
}

export enum LocalLockPaths {
  DOCKER_HELPER = 'helpers:docker'
}
