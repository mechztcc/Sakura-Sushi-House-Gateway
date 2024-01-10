import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthDecodeMiddleware } from './middlewares/auth-decode/auth-decode.middleware';
import { ProxyMiddleware } from './middlewares/proxy/proxy.middleware';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthDecodeMiddleware).forRoutes('/');
    consumer.apply(ProxyMiddleware).forRoutes('/');
  }
}
