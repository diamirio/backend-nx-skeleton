import { MicroserviceProviderService, GetKeyFromTypeMap } from '@webundsoehne/nestjs-util'

import { MessageQueues, MessageQueuePatterns, MessageQueueMap } from './microservice-provider.constants'

/**
 * Helper type for microservice client.
 */
export type MicroserviceClient = MicroserviceProviderService<MessageQueues, MessageQueuePatterns, MessageQueueMap>

/**
 * Helper type for microservice requests.
 */
export type MicroserviceRequest<Queue extends MessageQueues, Pattern extends MessageQueuePatterns[Queue]> = GetKeyFromTypeMap<MessageQueueMap, Queue>[Pattern]['request']

/**
 * Helper type for microservice responses.
 */
export type MicroserviceResponse<Queue extends MessageQueues, Pattern extends MessageQueuePatterns[Queue]> = GetKeyFromTypeMap<MessageQueueMap, Queue>[Pattern]['response']
