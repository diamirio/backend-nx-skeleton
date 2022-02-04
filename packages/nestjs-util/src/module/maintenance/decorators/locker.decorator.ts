import type { MaintenanceService } from '../maintenance.service'
import { InjectMaintenanceService } from './inject.decorator'

export function UseMaintenanceLocker (): MethodDecorator {
  return function (target: Record<string, any>, _propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    const originalFn = descriptor.value

    InjectMaintenanceService()(target, 'LOCKER_MAINTENANCE_SERVICE')

    descriptor.value = async function (...args: any[]): Promise<any> {
      const service: MaintenanceService = this.LOCKER_MAINTENANCE_SERVICE

      await service.enable(originalFn.name)

      try {
        const result = await originalFn.apply(this, args)

        await service.disable(originalFn.name)

        return result
      } catch (err) {
        await service.disable(originalFn.name)

        throw err
      }
    }

    descriptor.value.name = originalFn.name

    return descriptor
  }
}
