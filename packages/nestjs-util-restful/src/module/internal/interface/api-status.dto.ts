import { ApiProperty } from '@nestjs/swagger'

export class ApiStatus {
  @ApiProperty({ example: '1.0.0' })
  apiVersion: string

  @ApiProperty({ example: '2019-01-01T23:34:30', nullable: true })
  lastUpdate: string
}
