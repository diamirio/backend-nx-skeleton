import { DockerHelperCtx } from '@helpers/docker.helper.interface'
import { BrownieAvailableContainers } from '@webundsoehne/nx-tools'

export interface DockerNxCtx extends DockerHelperCtx {
  prompt: BrownieAvailableContainers[]
}
