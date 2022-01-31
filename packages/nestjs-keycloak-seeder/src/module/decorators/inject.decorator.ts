import { KeycloakSeederService } from '@module/keycloak-seeder.service'
import { Inject } from '@nestjs/common'

/**
 * Injects Keyclaok admin instance initiated to the service.
 */
export function InjectKeycloakSeederService (): (target: Record<string, unknown>, key: string | symbol, index?: number) => void {
  return Inject(KeycloakSeederService)
}
