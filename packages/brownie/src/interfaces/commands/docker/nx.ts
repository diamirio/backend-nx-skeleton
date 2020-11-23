import { BrownieAvailableContainers } from '@webundsoehne/nx-tools'

import { DockerHelperCtx } from '@helpers/docker.helper.interface'

export interface DockerNxCtx extends DockerHelperCtx {
  prompt: BrownieAvailableContainers[]
}
