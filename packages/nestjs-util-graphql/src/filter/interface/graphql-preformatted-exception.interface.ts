import type { GraphQLFormattedError } from 'graphql/error'

export class GraphQLPreformattedException<T extends Record<string, any>> extends Error implements GraphQLFormattedError {
  public locations: ExtendedGraphQLFormattedError<T>['locations']
  public path: ExtendedGraphQLFormattedError<T>['path']
  public extensions: ExtendedGraphQLFormattedError<T>['extensions']

  constructor (error: ExtendedGraphQLFormattedError<T>) {
    super()

    Object.assign(this, error)
  }
}

export type ExtendedGraphQLFormattedError<T> = Omit<GraphQLFormattedError, 'extensions'> & {
  extensions: T
}
