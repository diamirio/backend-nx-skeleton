import type { DockerHelperCtx } from '@helpers/docker.helper.interface'
import type { BrownieAvailableContainers } from '@webundsoehne/nx-tools/dist/integration/brownie.interface'

export interface DockerNxCtx extends DockerHelperCtx {
  prompt: BrownieAvailableContainers[]
}
