import { MessageQueuePatterns } from './microservice-provider.constants'

export type MicroserviceProviderBaseMessage<T extends MessageQueuePatterns<true>> = Record<keyof T, { request?: any; response?: any }>
