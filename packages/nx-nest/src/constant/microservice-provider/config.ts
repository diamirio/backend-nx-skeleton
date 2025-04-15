interface MessageQueueConfig {
  defaultConfig: Record<string, any>
  environmentConfig: Record<string, any>
  forRoot: string
  moduleClass: string
  importPath: string
}

export const MESSAGE_QUEUE_CONFIG_KEY = 'messageQueue'

export function getMessageQueueConfig (): MessageQueueConfig {
  return {
    defaultConfig: { urls: ['amqp://rabbitmq:5672'] },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    environmentConfig: { urls: { __name: 'MESSAGE_QUEUE_URLS', __format: 'json' } },
    forRoot: 'MicroserviceProviderModule.forRoot({ queue: [] })',
    moduleClass: 'MicroserviceProviderModule',
    importPath: '@webundsoehne/nestjs-util-microservices'
  }
}
