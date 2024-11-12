import { ClientRMQ } from '@nestjs/microservices'
import { CONNECT_FAILED_EVENT } from '@nestjs/microservices/constants'
import type { AmqpConnectionManager } from 'amqp-connection-manager'

export class ClientProxyRMQ extends ClientRMQ {
  handleError (client: AmqpConnectionManager): void {
    super.handleError(client)
    /*
     * closing the failed connection, to not block the client
     * if the client sends a request to a not yet ready rabbitmq, the connection fails for any following request
     * this will reopen a new connection on the next retry until the rabbitmq is ready
     * see: https://github.com/nestjs/nest/issues/10562 for more information
     */
    client.addListener(CONNECT_FAILED_EVENT, () => this.close())
  }
}
