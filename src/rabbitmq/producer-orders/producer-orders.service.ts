import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerOrdersService {
  constructor(@Inject('RABBITMQ_ORDERS') private client: ClientProxy) {}
  async connect() {
    this.client
      .connect()
      .catch(console.log)
      .then(() => {
        console.log('Rabbitmq Connected to orders_queue with success');
      });
  }
}
