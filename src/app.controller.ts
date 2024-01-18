import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEventService } from './rabbitmq/send-event/send-event.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly senEventRBQService: SendEventService,
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
      user_id
    };
    this.senEventRBQService.execute({ message: payload });
    return 'payload';
  }
}
