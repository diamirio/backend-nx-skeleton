/**
 * Since Awaited is missing from older Typescript versions, this takes in place to infer a function after the asynchronity is resolved.
 */
export type Await<T> = T extends PromiseLike<infer U> ? U : T
