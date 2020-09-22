import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { DefaultService } from './default.service'

@ApiTags('Developer')
@Controller()
export class DefaultController {
  constructor (private readonly appService: DefaultService) {}

  @ApiOperation({ summary: 'Test', description: 'Hello world route' })
  @ApiResponse({ status: 200, description: 'Hello world route' })
  @Get()
  public getHello (): string {
    return this.appService.getHello()
  }
}
