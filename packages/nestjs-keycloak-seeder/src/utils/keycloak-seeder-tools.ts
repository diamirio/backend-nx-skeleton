import type { ConnectionConfig } from '@keycloak/keycloak-admin-client/lib/client'
import { KeycloakAdminClient } from '@keycloak/keycloak-admin-client/lib/client'
import type { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation'
import type { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import { Injectable, Logger } from '@nestjs/common'

import { ArrayMergeBehavior, merge } from '@webundsoehne/deep-merge'
import type { KeycloakAdminOptions } from '@webundsoehne/nestjs-keycloak'
import { InjectKeycloak, KeycloakAdminService } from '@webundsoehne/nestjs-keycloak'
import type { ArrayElement, Await, DeepPartial } from '@webundsoehne/ts-utility-types'

/**
 * Extended Keycloak client specific for seeding operations.
 */
@Injectable()
export class KeycloakAdminSeederTools {
  public logger = new Logger(this.constructor.name)
  public client: KeycloakAdminClient
  public clients: Record<string, KeycloakAdminClient> = {}

  constructor (@InjectKeycloak() private keycloak: KeycloakAdminService) {}

  async getClient (realm?: string): Promise<KeycloakAdminClient> {
    if (!(this.client instanceof KeycloakAdminClient)) {
      this.client = await this.keycloak.getClient()
    }

    if (realm) {
      if (!(this.clients?.[realm] instanceof KeycloakAdminClient)) {
        throw new Error(`You must initiate the client for realm manually to use it: ${realm}`)
      }

      return this.clients[realm]
    } else {
      return this.client
    }
  }

  async createClient (realm: string, options?: DeepPartial<KeycloakAdminOptions>): Promise<KeycloakAdminClient> {
    if (!(this.clients?.[realm] instanceof KeycloakAdminClient)) {
      this.logger.debug(['Creating a new Keycloak API client for realm: %s', realm])

      const base = this.keycloak.getOptions()

      this.clients[realm] = new KeycloakAdminClient(merge({ arrayMerge: ArrayMergeBehavior.OVERWRITE }, base.initialize, (options?.initialize as ConnectionConfig) ?? {}))

      await this.clients[realm].auth(merge({ arrayMerge: ArrayMergeBehavior.OVERWRITE }, base.authentication, (options?.authentication as Credentials) ?? {}))
      this.clients[realm].setConfig(
        merge({ arrayMerge: ArrayMergeBehavior.OVERWRITE }, base.configuration, (options?.configuration as Partial<ConnectionConfig>) ?? {}, {
          realmName: realm
        })
      )
    }

    return this.clients[realm]
  }

  async getAll<
    K extends PropertyKey,
    T extends Extract<keyof KeycloakAdminClient, 'roles' | 'groups' | 'clients' | 'realms'> = Extract<keyof KeycloakAdminClient, 'roles' | 'groups' | 'clients' | 'realms'>
  >(
    context: T,
    options?: { groupBy?: keyof ArrayElement<Await<ReturnType<KeycloakAdminClient[T]['find']>>>, realm?: string }
  ): Promise<Record<K, Await<ReturnType<KeycloakAdminClient[T]['find']>>>> {
    options = {
      groupBy: 'name' as any,
      ...options ?? {}
    }

    const client = await this.getClient(options?.realm)
    const data = await client[context].find()

    return (data as any[]).reduce<Record<K, Await<ReturnType<KeycloakAdminClient[T]['find']>>>>(
      (o, d) => ({
        ...o,
        [d[options.groupBy]]: d
      }),
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
      {} as any
    )
  }

  /*
   * Swap the keys of an object to ids of the given group or role.
   */
  swapMapKeysToIds<T, K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, map: Record<string, T>): Record<string, T> {
    return Object.entries(map).reduce<Record<string, T>>((o, [name, d]) => {
      const id = this.getIdFromMappedData(data, name)

      return {
        ...o,
        [id]: d
      }
    }, {})
  }

  /*
   * Swap a array of names to the mapping.
   */
  swapNamesToMapping<T extends string[], K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, map: T): RoleMappingPayload[] {
    return map.reduce<RoleMappingPayload[]>((o, name) => {
      const id = this.getIdFromMappedData(data, name as unknown as string)

      return [...o, { name, id }] as RoleMappingPayload[]
    }, [])
  }

  /**
   * Internal function to get the id of named Keycloak entitiy from the given parsed map.
   */
  getIdFromMappedData<K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, name: string, identifier = 'id'): string {
    const id = (data as any)?.[name]?.[identifier]

    if (!id) {
      throw new Error(`Can not match Keycloak name "${name}" with id in ${JSON.stringify(data, null, 2)}`)
    }

    return id
  }

  /*
   * Creates a new Keycloak entity in the given scope.
   */
  async createNewKeycloakEntities<
    T extends Extract<keyof KeycloakAdminClient, 'groups' | 'roles' | 'clients' | 'realms'>,
    K extends Await<ReturnType<KeycloakAdminClient[T]['find']>>
  >(
    context: T,
    input: Await<ReturnType<KeycloakAdminClient[T]['find']>>,
    options?: {
      flush?: boolean
      flushUnknown?: boolean
      identifier?: keyof ArrayElement<Await<ReturnType<KeycloakAdminClient[T]['find']>>>
      fallbackToUpdate?: boolean
      realm?: string
    }
  ): Promise<void> {
    options = {
      identifier: 'name' as any,
      ...options ?? {}
    }

    const client = await this.getClient(options?.realm)
    const created = []

    if (options?.flush) {
      await this.flushKeycloakEntities(context, input, { realm: options?.realm })

      this.logger.warn(['Flushed all Keycloak %s in %s.', context, options?.realm ?? this.keycloak.client.realmName])
    }

    if (options?.flushUnknown) {
      const current = await client[context].find()

      const unknown = (current as any[]).filter((o) => !(input as any).map((m: ArrayElement<K>) => m[options.identifier as string]).includes(o[options.identifier as string]))

      if (unknown.length > 0) {
        await this.flushKeycloakEntities(context, unknown as K, { realm: options.realm })

        this.logger.warn(['Flushed unknown Keycloak %s in %s.', context, options?.realm ?? this.keycloak.client.realmName])
      }
    }

    await Promise.all(
      (input as any).map(async (data: ArrayElement<K>) => {
        try {
          await client[context].create(data)

          created.push(data[options.identifier as string])
        } catch (err) {
          if (options.fallbackToUpdate && ['groups', 'clients', 'realms'].includes(context)) {
            this.logger.warn(
              `Creating new ${context} failed, falling back to updating existing ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${
                data[options.identifier as string]
              }`
            )

            await this.updateKeycloakEntities(context as any, [data] as any, { identifier: options.identifier as string, realm: options?.realm } as any)
          } else {
            this.parseSeedError(err, {
              context: `Error while creating Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${data[options.identifier as string]}`
            })
          }
        }
      })
    )

    if (created.length > 0) {
      this.logger.log(['Created %d Keycloak %s in %s: %s', created.length, context, options?.realm ?? this.keycloak.client.realmName, created.join(', ')])
    } else {
      this.logger.log(['All Keycloak %s were already initialized in %s.', context, options?.realm ?? this.keycloak.client.realmName])
    }
  }

  /*
   * Creates a new Keycloak entity in the given scope.
   */
  async updateKeycloakEntities<T extends Extract<keyof KeycloakAdminClient, 'groups' | 'clients' | 'realms'>, K extends Await<ReturnType<KeycloakAdminClient[T]['find']>>>(
    context: T,
    input: K,
    options?: {
      silent?: boolean
      identifier?: keyof ArrayElement<Await<ReturnType<KeycloakAdminClient[T]['find']>>>
      realm?: string
    }
  ): Promise<void> {
    options = {
      identifier: 'name' as any,
      ...options ?? {}
    }

    const client = await this.getClient(options?.realm)
    const keycloakData = await this.getAll(context, { groupBy: options.identifier as any, realm: options?.realm })

    const updated = []

    const key = {
      realms: 'realm',
      clients: 'id',
      groups: 'id'
    }[context]

    await Promise.all(
      (input as any).map(async ({ [options.identifier as string]: name, ...data }) => {
        try {
          const update = { [options.identifier as string]: name, ...data }

          await client[context].update(
            {
              [key]: this.getIdFromMappedData(keycloakData, name, key)
            } as any,
            update
          )

          updated.push(name)
        } catch (err) {
          this.parseSeedError(err, {
            context: `Error while updating Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${name}`
          })
        }
      })
    )

    if (updated.length > 0 && !options?.silent) {
      this.logger.log(['Updated %d Keycloak %s in %s: %s', updated.length, context, options?.realm ?? this.keycloak.client.realmName, updated.join(', ')])
    }
  }

  async flushKeycloakEntities<
    T extends Extract<keyof KeycloakAdminClient, 'groups' | 'roles' | 'clients' | 'realms'>,
    K extends Await<ReturnType<KeycloakAdminClient[T]['find']>>
  >(context: T, input: Await<ReturnType<KeycloakAdminClient[T]['find']>>, options?: { identifier?: keyof ArrayElement<K>, realm?: string }): Promise<void> {
    options = {
      identifier: 'name' as any,
      ...options
    }

    const shouldBeIgnored: Partial<Record<Extract<keyof KeycloakAdminClient, 'groups' | 'roles' | 'clients' | 'realms'>, string[]>> = {
      roles: ['offline_access', 'uma_authorization', `default-roles-${options.realm ?? 'master'}`]
    }

    const deleteFuncKey: keyof KeycloakAdminClient[T] = (context === 'groups' ? 'del' : 'delById') as keyof KeycloakAdminClient[T]

    const client = await this.getClient(options?.realm)
    const deleted = []
    const ignored = []

    await Promise.all(
      (input as any).map(async (m: ArrayElement<K>) => {
        try {
          const name = m[options.identifier as string] as unknown as string

          if (shouldBeIgnored[context] && shouldBeIgnored[context].includes(name as unknown as string)) {
            ignored.push(name)

            return
          }

          const id = this.getIdFromMappedData(await this.getAll(context, { groupBy: options.identifier as any, realm: options?.realm }), name)

          await (client[context] as any)[deleteFuncKey]({ id })

          deleted.push(name)
        } catch (err) {
          this.logger.error(
            this.parseSeedError(err, {
              context: `Error while flushing Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${m[options.identifier as string]}`,
              return: true
            })
          )
        }
      })
    )

    if (deleted.length > 0) {
      this.logger.warn(['Deleted Keycloak %d %s in %s: %s', deleted.length, context, options?.realm ?? this.keycloak.client.realmName, deleted.join(', ')])
    }

    if (ignored.length > 0) {
      this.logger.debug(['Ignored deleting Keycloak %d %s in %s: %s', ignored.length, options?.realm ?? this.keycloak.client.realmName, ignored.join(', ')])
    }
  }

  async assignRolesToGroup (map: Record<string, string[]>, options?: { flushUnknown?: boolean, silent?: boolean, realm?: string }): Promise<void> {
    const client = await this.getClient(options?.realm)

    const groups = this.swapMapKeysToIds(await this.getAll('groups', { groupBy: 'name', realm: options?.realm }), map)
    const roles = await this.getAll('roles', { groupBy: 'name', realm: options?.realm })

    if (options?.flushUnknown) {
      try {
        await Promise.all(
          Object.entries(groups).map(async ([id, role]) => {
            const currentRoles = (await client.groups.listRoleMappings({ id })).realmMappings

            if (!currentRoles || currentRoles?.length === 0) {
              return
            }

            const current = (await client.groups.listRoleMappings({ id })).realmMappings.map((r) => ({
              id: r.id,
              name: r.name
            }))

            const deleted = []

            await Promise.all(
              current.map(async (c) => {
                if (!role.includes(c.name)) {
                  await client.groups.delRealmRoleMappings({ id, roles: [c] })

                  deleted.push(c.name)
                }
              })
            )

            if (deleted.length > 0) {
              this.logger.warn(['Flushed unknown roles in %s: %s from group %s', options?.realm ?? this.keycloak.client.realmName, deleted.join(', '), id])
            }
          })
        )
      } catch (err) {
        this.parseSeedError(err)
      }
    }

    await Promise.all(
      Object.entries(groups).map(async ([id, role]) => {
        try {
          // delete unknown mappings

          await client.groups.addRealmRoleMappings({ id, roles: this.swapNamesToMapping(roles, role) })

          if (!options?.silent) {
            this.logger.log(['Set new Keycloak role in %s: %s for group %s', options?.realm ?? this.keycloak.client.realmName, role.join(', '), id])
          }
        } catch (err) {
          this.parseSeedError(err)
        }
      })
    )
  }

  /*
   * Parse error messages for Keycloak since it returns a HTTP request.
   *
   * Will not throw out already exists messages, because we mostly do not care about them.
   */
  parseSeedError (err: any, options?: { context?: string, return?: boolean, log?: boolean }): void | never | string {
    if (!this.isAlreadyExistsError(err)) {
      err = err?.response?.data?.errorMessage ?? err

      err = options?.context ? `${options?.context}: ${err}` : err

      if (options?.return) {
        return err
      } else if (options?.log) {
        this.logger.error(err)

        return err
      } else {
        throw err
      }
    }
  }

  isAlreadyExistsError (err: any): boolean {
    return err?.response?.data?.errorMessage?.includes('already exists') || err?.response?.data?.errorMessage?.includes('Conflict detected') ? true : false
  }
}
