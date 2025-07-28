interface MessageQueueConfig {
  defaultConfig: Record<string, any>
  environmentConfig: Record<string, any>
  forRoot: string
  moduleClass: string
  importPath: string
}

export const MESSAGE_QUEUE_CONFIG_KEY = 'messageQueue'
export const MESSAGE_QUEUE_URL_ENV_VAR = 'MESSAGE_QUEUE_URLS'

export function buildMessageQueueUrl (host: string, protocol = 'amqp', port = 5672): string {
  return `${protocol}://${host}:${port}`
}

export function getMessageQueueConfig (): MessageQueueConfig {
  return {
    defaultConfig: { urls: [buildMessageQueueUrl('localhost')] },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    environmentConfig: { urls: { __name: MESSAGE_QUEUE_URL_ENV_VAR, __format: 'json' } },
    forRoot: 'MicroserviceProviderModule.forRoot({ queue: [] })',
    moduleClass: 'MicroserviceProviderModule',
    importPath: '@webundsoehne/nestjs-util-microservices'
  }
}
