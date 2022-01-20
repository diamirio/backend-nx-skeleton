export interface DockerComposeFile {
  version: string
  services: DockerComposeService
}

export type DockerComposeService = Record<string, any>

export type AvailableContainers = Record<
string,
{
  name: string
  base: string
  files: string
  path: string
  dockerfile: string[]
  env: string[]
  volumes: string[]
  ports: string[]
}
>

export interface ParsedContainers {
  name: string
  path: string
  output: string
  dir: string
  volumeDir: string
  config?: DockerComposeService
  image?: string
  dockerfile?: string
  env?: string
  volumes?: {
    from: string
    to: string
    url?: string
    options?: string
    mode?: VolumeModes
    perm?: number
    exact?: boolean
  }[]
  ports?: string[]
}

export enum VolumeModes {
  FILE = 'file',
  URL = 'url',
  DIR = 'dir',
  VOLUME = 'volume',
  MOUNT = 'mount'
}

export interface DockerHelperCtx {
  config: DockerComposeFile
  containers: AvailableContainers
  context: Record<string, ParsedContainers>
}
