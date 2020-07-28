export interface DockerComposeFile {
  services: DockerComposeService
}

export type DockerComposeService = Record<string, any>

export interface AvailableContainers {
  name: string
  path: string
  files: string[]
  env: string[]
  volumes: string[]
  dockerfile: string[]
}

export interface ParsedContainers {
  name: string
  path: string
  flags: {
    output: string
  }
  volumes: {
    from: string
    to: string
    options: string
  }[]
  env: string[]
}