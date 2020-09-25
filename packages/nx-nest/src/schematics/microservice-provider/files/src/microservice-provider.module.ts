import { Module, HttpModule } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices/enums/transport.enum'
import { MessageQueueEnum } from '@user-manager/types/enum'
import { ConfigService } from '@webundsoehne/nestjs-util'

import { MessageQueueService } from './message-queue.service'

const messageQueueUrls: string[] = ConfigService.get('messageQueue')?.urls
const fileServiceUrl: string = ConfigService.get('messageQueue')?.fileService ?? 'http://localhost:3008'

function provideMessageQueueClient (queue: MessageQueueEnum) {
  return {
    provide: queue,
    useFactory: (): ClientProxyFactory => {
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          queue,
          urls: messageQueueUrls
        }
      })
    }
  }
}

@Module({
  imports: [
    HttpModule.register({
      baseURL: fileServiceUrl
    })
  ],
  providers: [
    MessageQueueService,
    provideMessageQueueClient(MessageQueueEnum.AUTH),
    provideMessageQueueClient(MessageQueueEnum.LICENSE),
    provideMessageQueueClient(MessageQueueEnum.PRODUCT),
    provideMessageQueueClient(MessageQueueEnum.MAIL),
    provideMessageQueueClient(MessageQueueEnum.USER_MANAGER),
    provideMessageQueueClient(MessageQueueEnum.FILE),
    provideMessageQueueClient(MessageQueueEnum.EXTERNAL)
  ],
  exports: [ MessageQueueService ]
})
export class MessageQueueModule {}
