import { GraphQLFormattedError } from 'graphql'

export class GraphQLPreformattedException<T> extends Error implements GraphQLFormattedError<T> {
  public locations: GraphQLFormattedError<T>['locations']
  public path: GraphQLFormattedError<T>['path']
  public extensions: GraphQLFormattedError<T>['extensions']

  constructor ({ message, ...error }: GraphQLFormattedError<T>) {
    super(message)
    Object.assign(this, error)
  }
}
