import { KeycloakSeed } from './keycloak-seed'
import { KeycloakAdminSeederTools } from '@utils/keycloak-seeder-tools'

export type KeycloakSeeds = Record<PropertyKey, new (keycloak: KeycloakAdminSeederTools) => KeycloakSeed>
