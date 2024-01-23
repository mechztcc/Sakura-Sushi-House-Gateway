import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEventService } from './rabbitmq/send-event/send-event.service';
import { EmitEventService } from './rabbitmq/emit-event/emit-event.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sendEventRBQService: SendEventService,
    private readonly emitEventRBQService: EmitEventService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('orders')
  async registerOrder(@Body() body: any, @Headers() headers) {
    const { user_id } = headers;
    const payload = {
      ...body,
      user_id,
    };
    this.emitEventRBQService.execute({
      queue: 'create_order',
      message: payload,
    });
    return 'payload';
  }

  @Get('orders')
  async findByUser(@Headers() headers) {
    const { user_id } = headers;
    return await this.sendEventRBQService.execute({
      queue: 'list_orders_by_user',
      message: user_id,
    });
  }
}
