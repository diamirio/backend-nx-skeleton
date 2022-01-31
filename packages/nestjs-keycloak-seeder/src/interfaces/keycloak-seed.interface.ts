import type { KeycloakSeed } from './keycloak-seed'
import type { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

export type KeycloakSeeds = Record<PropertyKey, new (keycloak: KeycloakAdminSeederTools) => KeycloakSeed>
