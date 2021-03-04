import { GraphQLFormattedError } from 'graphql/error'

export class GraphQLPreformattedException<T> extends Error implements GraphQLFormattedError<T> {
  public locations: GraphQLFormattedError<T>['locations']
  public path: GraphQLFormattedError<T>['path']
  public extensions: GraphQLFormattedError<T>['extensions']

  constructor (error: GraphQLFormattedError<T>) {
    const err = super()
    Object.assign(this, err, error)
  }
}
