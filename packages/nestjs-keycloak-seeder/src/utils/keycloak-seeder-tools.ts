import { ConnectionConfig, KeycloakAdminClient } from '@keycloak/keycloak-admin-client/lib/client'
import { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation'
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import { Injectable, Logger } from '@nestjs/common'

import { deepMergeWithArrayOverwrite } from '@webundsoehne/deep-merge'
import { KeycloakAdminOptions, KeycloakAdminService, InjectKeycloak } from '@webundsoehne/nestjs-keycloak'
import { ArrayElement, Await, DeepPartial } from '@webundsoehne/ts-utility-types'

/**
 * Extended Keycloak client specific for seeding operations.
 */
@Injectable()
export class KeycloakAdminSeederTools {
  public logger = new Logger(this.constructor.name)
  public client: KeycloakAdminClient
  public clients: Record<string, KeycloakAdminClient> = {}

  constructor (@InjectKeycloak() private keycloak: KeycloakAdminService) {}

  public async getClient (realm?: string): Promise<KeycloakAdminClient> {
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

  public async createClient (realm: string, options?: DeepPartial<KeycloakAdminOptions>): Promise<KeycloakAdminClient> {
    if (!(this.clients?.[realm] instanceof KeycloakAdminClient)) {
      this.logger.debug(`Creating a new Keycloak API client for realm: ${realm}`)

      const base = this.keycloak.getOptions()

      this.clients[realm] = new KeycloakAdminClient(deepMergeWithArrayOverwrite(base.initialize, (options?.initialize as ConnectionConfig) ?? {}))

      await this.clients[realm].auth(deepMergeWithArrayOverwrite(base.authentication, (options?.authentication as Credentials) ?? {}))
      this.clients[realm].setConfig(
        deepMergeWithArrayOverwrite(base.configuration, (options?.configuration as Partial<ConnectionConfig>) ?? {}, {
          realmName: realm
        })
      )
    }

    return this.clients[realm]
  }

  public async getAll<
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

    return (data as any[]).reduce(
      (o, d) => ({
        ...o,
        [d[options.groupBy]]: d
      }),
      {} as Record<K, Await<ReturnType<KeycloakAdminClient[T]['find']>>>
    )
  }

  /*
   * Swap the keys of an object to ids of the given group or role.
   */
  public swapMapKeysToIds<T, K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, map: Record<string, T>): Record<string, T> {
    return Object.entries(map).reduce((o, [ name, d ]) => {
      const id = this.getIdFromMappedData(data, name)

      return {
        ...o,
        [id]: d
      }
    }, {} as Record<string, T>)
  }

  /*
   * Swap a array of names to the mapping.
   */
  public swapNamesToMapping<T extends string[], K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, map: T): RoleMappingPayload[] {
    return map.reduce((o, name) => {
      const id = this.getIdFromMappedData(data, name as unknown as string)

      return [ ...o, { name, id } ] as RoleMappingPayload[]
    }, [] as RoleMappingPayload[])
  }

  /**
   * Internal function to get the id of named Keycloak entitiy from the given parsed map.
   */
  public getIdFromMappedData<K extends Await<ReturnType<KeycloakAdminSeederTools['getAll']>>>(data: K, name: string, identifier = 'id'): string {
    const id = (data as any)?.[name]?.[identifier]

    if (!id) {
      throw new Error(`Can not match Keycloak name "${name}" with id in ${JSON.stringify(data, null, 2)}`)
    }

    return id
  }

  /*
   * Creates a new Keycloak entity in the given scope.
   */
  public async createNewKeycloakEntities<
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

      this.logger.warn(`Flushed all Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}.`)
    }

    if (options?.flushUnknown) {
      const current = await client[context].find()

      const unknown = (current as any[]).filter((o) => !(input as any).map((m: ArrayElement<K>) => m[options.identifier]).includes(o[options.identifier]))

      if (unknown.length > 0) {
        await this.flushKeycloakEntities(context, unknown as K)

        this.logger.warn(`Flushed unknown Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}.`)
      }
    }

    await Promise.all(
      (input as any).map(async (data: ArrayElement<K>) => {
        try {
          await client[context].create(data)

          created.push(data[options.identifier])
        } catch (err) {
          if (options.fallbackToUpdate && [ 'groups', 'clients', 'realms' ].includes(context)) {
            this.logger.warn(
              `Creating new ${context} failed, falling back to updating existing ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${data[options.identifier]}`
            )

            await this.updateKeycloakEntities(context as any, [ data ] as any, { identifier: options.identifier, realm: options?.realm } as any)
          } else {
            this.parseSeedError(err, {
              context: `Error while creating Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${data[options.identifier]}`
            })
          }
        }
      })
    )

    if (created.length > 0) {
      this.logger.log(`Created ${created.length} Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${created.join(', ')}`)
    } else {
      this.logger.log(`All Keycloak ${context} were already initialized in ${options?.realm ?? this.keycloak.client.realmName}.`)
    }
  }

  /*
   * Creates a new Keycloak entity in the given scope.
   */
  public async updateKeycloakEntities<T extends Extract<keyof KeycloakAdminClient, 'groups' | 'clients' | 'realms'>, K extends Await<ReturnType<KeycloakAdminClient[T]['find']>>>(
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
    const keycloakData = await this.getAll(context, { groupBy: options.identifier, realm: options?.realm })

    const updated = []

    const key = {
      realms: 'realm',
      clients: 'id',
      groups: 'id'
    }[context]

    await Promise.all(
      (input as any).map(async ({ [options.identifier]: name, ...data }) => {
        try {
          const update = { [options.identifier]: name, ...data }

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
      this.logger.log(`Updated ${updated.length} Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${updated.join(', ')}`)
    }
  }

  public async flushKeycloakEntities<
    T extends Extract<keyof KeycloakAdminClient, 'groups' | 'roles' | 'clients' | 'realms'>,
    K extends Await<ReturnType<KeycloakAdminClient[T]['find']>>
  >(context: T, input: Await<ReturnType<KeycloakAdminClient[T]['find']>>, options?: { identifier?: keyof ArrayElement<K>, realm?: string }): Promise<void> {
    options = {
      identifier: 'name' as any,
      ...options
    }

    const shouldBeIgnored: Partial<Record<Extract<keyof KeycloakAdminClient, 'groups' | 'roles' | 'clients' | 'realms'>, string[]>> = {
      roles: [ 'offline_access', 'uma_authorization' ]
    }

    const deleteFuncKey: keyof KeycloakAdminClient[T] = (context === 'groups' ? 'del' : 'delById') as keyof KeycloakAdminClient[T]

    const client = await this.getClient(options?.realm)
    const deleted = []
    const ignored = []

    await Promise.all(
      (input as any).map(async (m: ArrayElement<K>) => {
        try {
          const name = m[options.identifier] as unknown as string

          if (shouldBeIgnored?.[context].includes(name as unknown as string)) {
            ignored.push(name)

            return
          }

          const id = this.getIdFromMappedData(await this.getAll(context, { groupBy: options.identifier as any, realm: options?.realm }), name)

          await (client[context] as any)[deleteFuncKey]({ id })

          deleted.push(name)
        } catch (err) {
          this.logger.error(
            this.parseSeedError(err, {
              context: `Error while flushing Keycloak ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${m[options.identifier]}`,
              return: true
            })
          )
        }
      })
    )

    if (deleted.length > 0) {
      this.logger.warn(`Deleted Keycloak ${deleted.length} ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${deleted.join(', ')}`)
    }

    if (ignored.length > 0) {
      this.logger.debug(`Ignored deleting Keycloak ${ignored.length} ${context} in ${options?.realm ?? this.keycloak.client.realmName}: ${ignored.join(', ')}`)
    }
  }

  public async assignRolesToGroup (map: Record<string, string[]>, options?: { flushUnknown?: boolean, silent?: boolean, realm?: string }): Promise<void> {
    const client = await this.getClient(options?.realm)

    const groups = this.swapMapKeysToIds(await this.getAll('groups', { groupBy: 'name', realm: options?.realm }), map)
    const roles = await this.getAll('roles', { groupBy: 'name', realm: options?.realm })

    if (options?.flushUnknown) {
      try {
        await Promise.all(
          Object.entries(groups).map(async ([ id, role ]) => {
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
                  await client.groups.delRealmRoleMappings({ id, roles: [ c ] })

                  deleted.push(c.name)
                }
              })
            )

            if (deleted.length > 0) {
              this.logger.warn(`Flushed unknown roles in ${options?.realm ?? this.keycloak.client.realmName}: ${deleted.join(', ')} from group ${id}`)
            }
          })
        )
      } catch (err) {
        this.parseSeedError(err)
      }
    }

    await Promise.all(
      Object.entries(groups).map(async ([ id, role ]) => {
        try {
          // delete unknown mappings

          await client.groups.addRealmRoleMappings({ id, roles: this.swapNamesToMapping(roles, role) })

          if (!options?.silent) {
            this.logger.log(`Set new Keycloak role in ${options?.realm ?? this.keycloak.client.realmName}: ${role.join(', ')} for group ${id}`)
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
  public parseSeedError (err: any, options?: { context?: string, return?: boolean, log?: boolean }): void | never | string {
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

  public isAlreadyExistsError (err: any): boolean {
    return err?.response?.data?.errorMessage?.includes('already exists') || err?.response?.data?.errorMessage?.includes('Conflict detected') ? true : false
  }
}
