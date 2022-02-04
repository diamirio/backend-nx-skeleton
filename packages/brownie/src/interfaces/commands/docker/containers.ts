import type { DockerHelperCtx } from '@helpers/docker.helper.interface'
import type { DockerHelperLock } from '@interfaces/lock-file.interface'
import type { BrownieAvailableContainers } from '@webundsoehne/nx-tools/dist/integration/brownie.interface'

export interface DockerContainerAddCtx extends DockerHelperCtx {
  prompt: BrownieAvailableContainers[]
}

export class DockerContainersPurgeCtx {
  prompt: {
    containers?: BrownieAvailableContainers[]
    purge?: DockerHelperLock[]
  }

  constructor () {
    this.prompt = {}
    this.prompt.containers = []
    this.prompt.purge = []
  }
}
