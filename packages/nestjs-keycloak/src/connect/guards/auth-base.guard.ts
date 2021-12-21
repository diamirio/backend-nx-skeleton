import { CanActivate, ExecutionContext, ForbiddenException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Grant, Keycloak } from 'keycloak-connect'

import {
  KEYCLOAK_CONNECT_METADATA_GROUPS,
  KEYCLOAK_CONNECT_METADATA_ROLES,
  KEYCLOAK_CONNECT_METADATA_SCOPES,
  KEYCLOAK_CONNECT_METADATA_UNPROTECTED
} from '@connect/connect.constants'
import { ExceptionMessagesFallback, KeycloakConnectOptions, KeycloakConnectUserInfo, ScopesOption } from '@connect/connect.interfaces'
import { InjectKeycloakConnect, InjectKeycloakConnectOptions } from '@connect/decorators'
import { EnrichedExpressRequest, EnrichedFastifyRequest } from '@interfaces/request.interface'

/**
 * Application AuthGuard for Keycloak applications.
 * Base for extending it for multiple use cases.
 */
@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(this.constructor.name)

  constructor (
    @InjectKeycloakConnect() private keycloak: Keycloak,
    @InjectKeycloakConnectOptions() private keycloakOptions: KeycloakConnectOptions,
    public readonly reflector: Reflector
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const isUnprotected = this.reflector.get<boolean>(KEYCLOAK_CONNECT_METADATA_UNPROTECTED, context.getHandler())
    if (isUnprotected) {
      // allow if path is marked as unprotected
      return true
    }

    const request: EnrichedFastifyRequest | EnrichedExpressRequest = this.getRequest(context)

    const token = this.extractBearerToken(request)

    if (!token) {
      // deny if there is no valid token given
      throw new UnauthorizedException(this.getExceptionMessage('tokenMissing'))
    }

    try {
      // create generic grant and user, async to make it faster
      const [ grant, user ] = await Promise.all([
        this.keycloak.grantManager.createGrant({ access_token: token as any }),
        this.keycloak.grantManager.userInfo<string, KeycloakConnectUserInfo>(token)
      ])

      // groups
      const groups = user?.groups as unknown as string[]
      this.validate('groups', groups, this.reflector.get<string[]>(KEYCLOAK_CONNECT_METADATA_GROUPS, context.getHandler()))

      // roles
      const roles = await this.fetchRoles(grant)
      // first check meta-data from route-handler-method, if none, check parent-class (resolver, controller)
      this.validate('roles', roles, this.reflector.getAllAndOverride<string[]>(KEYCLOAK_CONNECT_METADATA_ROLES, [ context.getHandler(), context.getClass() ]))

      // scopes
      const scopes = this.fetchScopes(roles, this.reflector.get<ScopesOption>(KEYCLOAK_CONNECT_METADATA_SCOPES, context.getHandler()))
      this.validate(
        'scopes',
        scopes,
        Object.values(this.keycloakOptions?.scopes || {}).filter((scope) => !(this.keycloakOptions?.scopesUnauthorized || []).includes(scope))
      )

      request.accessToken = token
      request.user = {
        id: user.sub as string,
        username: user.preferred_username as string,
        email: user.email as string,
        verified: user.email_verified as boolean,
        groups,
        roles,
        scopes
      }

      return true
    } catch (error) {
      this.logger.debug(`Could not validate access token, because: ${error?.message || error?.response?.message}`)

      if (error?.response?.statusCode === HttpStatus.FORBIDDEN) {
        // deny and forward the forbidden message
        throw new ForbiddenException(error?.response?.message)
      }

      // deny and raise default unauthorized message
      throw new UnauthorizedException(this.getExceptionMessage('default'))
    }
  }

  /**
   * Validate given condition to match the required values.
   */
  protected validate (key: string, values: string[], authorizedValues: string[] = []): void {
    if (this.keycloakOptions?.[`${key}Required`] && values?.length === 0) {
      throw new ForbiddenException(this.getExceptionMessage(`${key}Missing`))
    }

    if (values?.length > 0) {
      if (authorizedValues?.length && authorizedValues.length > 0) {
        if (!values.some((value) => authorizedValues.includes(value))) {
          throw new ForbiddenException(this.getExceptionMessage(`${key}Unauthorized`))
        }
      }
    }
  }

  private getExceptionMessage (message: string): string | undefined {
    return this.keycloakOptions?.exceptionMessages?.[message] || ExceptionMessagesFallback?.[message]
  }

  private extractBearerToken (request: EnrichedExpressRequest | EnrichedFastifyRequest): string {
    if (request?.headers?.authorization) {
      const [ type, token ] = (request.headers.authorization as string).split(' ')

      if (type.toLowerCase() === 'bearer') {
        return token
      }
    } else if (request?.query?.token) {
      return request.query.token as string
    }
  }

  private async fetchRoles (grant: Grant): Promise<string[]> {
    const accessToken = grant.access_token

    return Object.values(this.keycloakOptions?.roles || {}).reduce((realmRoles, role) => {
      if (accessToken.hasRealmRole(role)) {
        realmRoles.push(role)
      }

      return realmRoles
    }, [])
  }

  private fetchScopes (roles: string[], authorizedScopes: ScopesOption = {}): string[] {
    return roles.reduce((scopes, role) => {
      if (authorizedScopes?.[role] && this.keycloakOptions?.scopes?.[authorizedScopes?.[role]]) {
        scopes.push(authorizedScopes[role])
      }

      return scopes
    }, [])
  }

  public abstract getRequest (context: ExecutionContext): EnrichedFastifyRequest | EnrichedExpressRequest
  public abstract getRequest (context: ExecutionContext): EnrichedFastifyRequest
  public abstract getRequest (context: ExecutionContext): EnrichedExpressRequest
}
