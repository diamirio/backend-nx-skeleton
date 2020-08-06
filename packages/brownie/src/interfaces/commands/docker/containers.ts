export interface DockerComposeFile {
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
  dockerfile?: string
  env?: string
  volumes?: {
    from: string
    to: string
    options?: string
    mode?: 'file' | 'dir' | 'volume'
  }[]
}

export interface DockerContainerAddCtx {
  containers: AvailableContainers
  prompt: string[]
  context: Record<string, ParsedContainers>
}
