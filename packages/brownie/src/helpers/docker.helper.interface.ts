export interface DockerComposeFile {
  version: string
  services: DockerComposeService
}

export type DockerComposeService = Record<string, any>

export interface AvailableContainers {
  [name: string]: {
    name: string
    base: string
    files: string
    path: string
    dockerfile: string[]
    env: string[]
    volumes: string[]
  }
}

export interface ParsedContainers {
  name: string
  path: string
  output: string
  dir: string
  volumeDir: string
  dockerfile?: string
  env?: string
  volumes?: {
    from: string
    to: string
    options?: string
    mode?: VolumeModes
    exact?: boolean
  }[]
}

export enum VolumeModes {
  FILE = 'file',
  DIR = 'dir',
  VOLUME = 'volume',
  MOUNT = 'mount'
}

export interface DockerHelperCtx {
  config: DockerComposeFile
  containers: AvailableContainers
  context: Record<string, ParsedContainers>
}
