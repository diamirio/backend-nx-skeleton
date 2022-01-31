import { Controller, Get, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApiStatus } from './internal.interface'
import type { InternalService } from './internal.service'

@ApiTags('Developer')
@Controller('internal')
export class InternalController {
  constructor (private internalService: InternalService) {}

  @ApiOperation({ summary: 'Status', description: 'Check if API is still alive or not' })
  @ApiResponse({
    status: 200,
    description: 'API still alive',
    type: ApiStatus
  })
  @Get('status')
  @HttpCode(200)
  public async getStatus (): Promise<ApiStatus> {
    return this.internalService.checkApiStatus()
  }

  @ApiOperation({ summary: 'Changelog', description: 'Get changelog' })
  @ApiResponse({ status: 200, description: 'Changelog (markdown format)' })
  @ApiProduces('text/markdown')
  @Get('changelog')
  @HttpCode(200)
  public async getChangelog (): Promise<string> {
    return this.internalService.getChangelog()
  }
}
