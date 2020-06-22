import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ServerService } from './server.service'

@ApiTags('Developer')
@Controller()
export class ServerController {
  constructor (private readonly appService: ServerService) {}

  @ApiOperation({ summary: 'Test', description: 'Hello world route' })
  @ApiResponse({ status: 200, description: 'Hello world route' })
  @Get()
  async getHello (): Promise<string> {
    return this.appService.getHello()
  }
}
