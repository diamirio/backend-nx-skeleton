import { KeycloakAdminClient } from '@keycloak/keycloak-admin-client/lib/client'
import { Injectable, Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { KeycloakAdminOptions } from './admin.interfaces'

/**
 * KeycloakAdminService manages the Keycloak RESTFUL API client.
 */
@Injectable()
export class KeycloakAdminService {
  public readonly logger: Logger = new Logger(this.constructor.name)
  private keycloakAdminClient: KeycloakAdminClient

  constructor (private readonly options: KeycloakAdminOptions) {}

  /**
   * Getter for the REST API client.
   */
  get client (): KeycloakAdminClient {
    return this.keycloakAdminClient
  }

  /**
   * Creates a new client if it does not exists, returns the singleton instance if it does.
   */
  async getClient (): Promise<KeycloakAdminClient> {
    if (!this.validateClient()) {
      await this.createClient()
    }

    return this.keycloakAdminClient
  }

  /**
   * Recreates the client first before returning it.
   */
  async reloadClient (): Promise<KeycloakAdminClient> {
    await this.createClient()

    return this.keycloakAdminClient
  }

  /**
   * Returns the options that Keycloak REST API client is initiated with.
   */
  getOptions (): KeycloakAdminOptions {
    return this.options
  }

  /**
   * Creates and authorizes to the Keycloak REST API.
   */
  private async createClient (): Promise<void> {
    this.keycloakAdminClient = new KeycloakAdminClient(this.options.initialize)

    await this.keycloakAdminClient.auth(this.options.authentication)
    this.keycloakAdminClient.setConfig(this.options.configuration)
  }

  /**
   * Checks whether current client is expired.
   */
  private validateClient (): boolean {
    const accessToken = this.keycloakAdminClient?.accessToken

    return !(!accessToken || this.isExpiredAccessToken(accessToken))
  }

  /**
   * Checks whether the current authentication token to Keycloak REST API is expired.
   */
  private isExpiredAccessToken (accessToken: string): boolean {
    try {
      const tokenPayload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())

      if (!tokenPayload?.exp) {
        return false
      }

      return Math.floor(new Date().getTime() / 1000) >= tokenPayload.exp
    } catch (error) {
      this.logger.debug(`Can't parse keycloak-admin token, because: ${error.message}`)

      return true
    }
  }
}
