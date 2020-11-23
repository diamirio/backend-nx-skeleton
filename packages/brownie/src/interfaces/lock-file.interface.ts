/* eslint-disable @typescript-eslint/naming-convention */

export interface LockFile {
  [LockPaths.DOCKER_HELPER]: Record<string, Partial<Record<DockerHelperLock, string>>>
}

export enum DockerHelperLock {
  DIRECTORIES = 'configuration',
  VOLUMES = 'volumes'
}

export enum LockPaths {
  DOCKER_HELPER = 'helpers:docker'
}
