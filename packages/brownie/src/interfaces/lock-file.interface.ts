/* eslint-disable @typescript-eslint/naming-convention */

export interface LocalLockFile {
  [LocalLockPaths.DOCKER_HELPER]: Record<string, Partial<Record<DockerHelperLock, string>>>
}

export enum DockerHelperLock {
  DIRECTORIES = 'configuration',
  VOLUMES = 'volumes'
}

export enum LocalLockPaths {
  DOCKER_HELPER = 'helpers:docker'
}
