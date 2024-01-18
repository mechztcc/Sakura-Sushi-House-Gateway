import { Body, Controller, Get, Post, RawBodyRequest, Req } from '@nestjs/common';
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
  async registerOrder(@Body() body: any) {
    console.log(body);
    
    this.senEventRBQService.execute({ message: body });
    return 'payload';
  }
}
