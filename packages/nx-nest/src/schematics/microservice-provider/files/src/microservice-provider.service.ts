import { HttpService, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  AuthQueuePattern,
  ExternalQueuePattern,
  FileQueuePattern,
  LicenseQueuePattern,
  MailQueuePattern,
  MessageQueueEnum,
  MessageQueuePatterns,
  MessageQueuePatternTypes,
  ProductQueuePattern,
  UserManagerQueuePattern
} from '@user-manager/types/enum'
import { MessageQueueInputMap } from '@user-manager/types/input-type'
import { MessageQueueResponseMap } from '@user-manager/types/response'
import { LoggerService } from '@webundsoehne/nestjs-util'

@Injectable()
export class MicroserviceProviderService {
  private readonly clients: Record<MessageQueueEnum, ClientProxy>
  private readonly logger = new LoggerService(this.constructor.name)

  constructor(
    @Inject(MessageQueueEnum.AUTH) private readonly authClient: ClientProxy,
    @Inject(MessageQueueEnum.LICENSE) private readonly licenseClient: ClientProxy,
    @Inject(MessageQueueEnum.PRODUCT) private readonly productClient: ClientProxy,
    @Inject(MessageQueueEnum.MAIL) private readonly mailClient: ClientProxy,
    @Inject(MessageQueueEnum.USER_MANAGER) private readonly userManagerClient: ClientProxy,
    @Inject(MessageQueueEnum.FILE) private readonly fileClient: ClientProxy,
    @Inject(MessageQueueEnum.EXTERNAL) private readonly externalClient: ClientProxy
  ) {
    this.clients = {
      [MessageQueueEnum.AUTH]: this.authClient,
      [MessageQueueEnum.LICENSE]: this.licenseClient,
      [MessageQueueEnum.PRODUCT]: this.productClient,
      [MessageQueueEnum.MAIL]: this.mailClient,
      [MessageQueueEnum.USER_MANAGER]: this.userManagerClient,
      [MessageQueueEnum.FILE]: this.fileClient,
      [MessageQueueEnum.EXTERNAL]: this.externalClient
    }
  }

  private static getMessageQueueFromPattern<Pattern extends MessageQueuePatterns>(_pattern: Pattern): MessageQueueEnum {
    const pattern: MessageQueuePatterns = _pattern

    if (this.isPattern<AuthQueuePattern>(pattern, AuthQueuePattern)) {
      return MessageQueueEnum.AUTH
    }
    if (this.isPattern<LicenseQueuePattern>(pattern, LicenseQueuePattern)) {
      return MessageQueueEnum.LICENSE
    }
    if (this.isPattern<ProductQueuePattern>(pattern, ProductQueuePattern)) {
      return MessageQueueEnum.PRODUCT
    }
    if (this.isPattern<MailQueuePattern>(pattern, MailQueuePattern)) {
      return MessageQueueEnum.MAIL
    }
    if (this.isPattern<UserManagerQueuePattern>(pattern, UserManagerQueuePattern)) {
      return MessageQueueEnum.USER_MANAGER
    }
    if (this.isPattern<FileQueuePattern>(pattern, FileQueuePattern)) {
      return MessageQueueEnum.FILE
    }
    if (this.isPattern<ExternalQueuePattern>(pattern, ExternalQueuePattern)) {
      return MessageQueueEnum.EXTERNAL
    }

    const _exhaustiveCheck: never = pattern
    throw new Error(`pattern "${pattern}" is not defined in any of checked QueuePatterns`)
  }

  private static isPattern<T extends MessageQueuePatterns>(pattern: MessageQueuePatterns, queuePatterns: MessageQueuePatternTypes): pattern is T {
    return Object.values(queuePatterns).includes(pattern)
  }

  async send<Pattern extends MessageQueuePatterns>(_pattern: Pattern, payload: MessageQueueInputMap[Pattern]): Promise<Required<MessageQueueResponseMap[Pattern]>['result']> {
    const pattern: MessageQueuePatterns = _pattern

    // write to MessageQueue
    const messageQueue = MicroserviceProviderService.getMessageQueueFromPattern(pattern)
    const { result, error }: MessageQueueResponseMap[Pattern] = await this.clients[messageQueue].send(pattern, payload).toPromise()

    if (error) {
      throw error
    }

    if (!result) {
      this.logger.debug(JSON.stringify({ result, error }))
      throw new Error('Result of MessageQueue must be defined when error is not set.')
    }

    return result
  }
}
