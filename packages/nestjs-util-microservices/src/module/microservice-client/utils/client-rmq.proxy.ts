import { ClientRMQ } from '@nestjs/microservices'
import { CONNECT_FAILED_EVENT } from '@nestjs/microservices/constants'
import type { AmqpConnectionManager } from 'amqp-connection-manager'

export class ClientProxyRMQ extends ClientRMQ {
  handleError (client: AmqpConnectionManager): void {
    super.handleError(client)
    client.addListener(CONNECT_FAILED_EVENT, () => this.close())
  }
}
