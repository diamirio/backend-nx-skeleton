import { ApiProperty } from '@nestjs/swagger'

export interface InternalOptions {
  lastUpdateFilePath?: string
  changelogFilePath?: string
}

export class ApiStatus {
  @ApiProperty({ example: '1.0.0' })
    apiVersion: string

  @ApiProperty({ example: '2019-01-01T23:34:30' })
    lastUpdate: string
}
