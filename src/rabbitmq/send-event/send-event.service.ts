import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface IEventPayload {
  message: string;
  queue: string;
}
@Injectable()
export class SendEventService {
  constructor(
    @Inject('RABBITMQ_ORDERS') private readonly client: ClientProxy,
  ) {}

  async execute({ message, queue }: IEventPayload) {
    return this.client.send(queue, message);
  }
}
