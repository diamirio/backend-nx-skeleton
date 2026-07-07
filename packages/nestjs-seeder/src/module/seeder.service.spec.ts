import { afterEach, vitest } from 'vitest'

import { SeederService } from './seeder.service'

describe('SeederService', () => {
  afterEach(() => {
    vitest.clearAllMocks()
  })

  const moduleRef = {
    get: vitest.fn().mockImplementation((seed) => seed)
  } as any

  describe('empty seeds', () => {
    const seeds = {}
    const service = new SeederService(seeds, moduleRef)

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({ log: vitest.fn() })

    test('should be defined', () => {
      expect(service).toBeDefined()
    })

    test('should not call anything', async () => {
      await expect(service.init()).resolves.not.toThrow()

      expect(moduleRef.get).not.toHaveBeenCalled()
      expect((service as any).logger.log).toHaveBeenCalledTimes(1)
      expect((service as any).logger.log).toHaveBeenCalledWith(`Finished seeding`)
    })
  })

  describe('run seeds', () => {
    const seeds = {
      mock: { run: vitest.fn() },
      another: { run: vitest.fn() },
      last: { run: vitest.fn() }
    } as any
    const service = new SeederService(seeds, moduleRef)

    vitest.spyOn(service as any, 'logger', 'get').mockReturnValue({ log: vitest.fn() })

    test('should be defined', () => {
      expect(service).toBeDefined()
    })

    test('should run each seed', async () => {
      await expect(service.init()).resolves.not.toThrow()

      expect(moduleRef.get).toHaveBeenCalledTimes(3)
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Running seed: mock`)
      expect(seeds.mock.run).toHaveBeenCalled()
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Finished seed: mock`)
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Running seed: another`)
      expect(seeds.another.run).toHaveBeenCalled()
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Finished seed: another`)
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Running seed: last`)
      expect(seeds.last.run).toHaveBeenCalled()
      expect((service as any).logger.log).toHaveBeenCalledWith(`   Finished seed: last`)
      expect((service as any).logger.log).toHaveBeenCalledWith(`Finished seeding`)
    })
  })
})
