import { HttpModule } from '@nestjs/axios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthDecodeMiddleware } from './middlewares/auth-decode/auth-decode.middleware';
import { ProxyMiddleware } from './middlewares/proxy/proxy.middleware';
import { ProduceLogsService } from './rabbitmq/producer-logs/producer-logs.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [HttpModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthDecodeMiddleware).forRoutes('/');
    consumer.apply(ProxyMiddleware).forRoutes('/');
  }
}
