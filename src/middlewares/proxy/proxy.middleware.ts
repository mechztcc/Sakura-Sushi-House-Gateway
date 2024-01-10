import { Injectable, NestMiddleware } from '@nestjs/common';
import { Options, createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const proxyOptionsUsers: Options = {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      headers: {
        'Content-Type': 'application/json',
      },
      secure: false,
      pathRewrite: {
        '^/users': '/users',
      },
    };

    const proxyOptionsAuth: Options = {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      headers: {
        'Content-Type': 'application/json',
      },
      secure: false,
      pathRewrite: {
        '^/auth': '/auth',
      },
    };

    const proxyUsers = createProxyMiddleware(proxyOptionsUsers);
    const proxyAuth = createProxyMiddleware(proxyOptionsAuth);

    if (req.url.startsWith('/users')) {
      return proxyUsers(req, res, next);
    }

    if (req.url.startsWith('/auth')) {
      return proxyAuth(req, res, next);
    }
    next();
  }
}
