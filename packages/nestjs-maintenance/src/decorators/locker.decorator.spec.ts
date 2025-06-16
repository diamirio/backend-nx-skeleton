/** biome-ignore-all lint/complexity/useLiteralKeys: access to private properties */
import { Injectable } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { MaintenanceModule } from '../maintenance.module'
import { MaintenanceService } from '../maintenance.service'
import { UseMaintenanceLocker } from './locker.decorator'

@Injectable()
class MockService {
  @UseMaintenanceLocker()
  methodA() {
    return new Promise((resolve) => setTimeout(resolve, 10))
  }

  methodB() {}
}

describe('Maintenance Locker decorator', () => {
  let service: MockService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MaintenanceModule.forRoot({ application: 'mock', lockfilePath: 'mock.lock' })],
      providers: [MockService]
    }).compile()

    service = await moduleRef.get(MockService)
  })

  test('should be defined', () => {
    expect(service).toBeDefined()
  })

  test('should lock if methodA is called', async () => {
    const enable = jest.spyOn(MaintenanceService.instance, 'enable')
    const disable = jest.spyOn(MaintenanceService.instance, 'disable')

    await service.methodA()
    expect(enable).toHaveBeenCalled()
    expect(disable).toHaveBeenCalled()
  })
})
