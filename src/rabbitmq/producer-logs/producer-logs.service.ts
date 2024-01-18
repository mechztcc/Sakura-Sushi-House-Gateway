import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProduceLogsService {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  async connect() {
    this.client
      .connect()
      .catch(console.log)
      .then(() => {
        console.log('Rabbitmq Connected to logs_queue with success');
      });
  }
}
