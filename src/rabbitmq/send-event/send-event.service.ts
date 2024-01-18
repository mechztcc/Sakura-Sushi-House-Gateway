import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface IEventPayload {
  message: string;
}
@Injectable()
export class SendEventService {
  constructor(
    @Inject('RABBITMQ_ORDERS') private readonly client: ClientProxy,
  ) {}

  execute({ message }: IEventPayload) {
    this.client.emit('create_order', message);
  }
}
 