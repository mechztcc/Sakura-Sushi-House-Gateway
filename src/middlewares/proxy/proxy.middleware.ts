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

    const proxyOptionsProducts: Options = {
      target: 'http://localhost:3002/',
      changeOrigin: true,
      headers: {
        'Content-Type': 'application/json',
      },
      secure: false,
      pathRewrite: {
        '^/products': '/products',
      },
    };

    const proxyUsers = createProxyMiddleware(proxyOptionsUsers);
    const proxyAuth = createProxyMiddleware(proxyOptionsAuth);
    const proxyProducts = createProxyMiddleware(proxyOptionsProducts);

    if (req.url.startsWith('/users')) {
      return proxyUsers(req, res, next);
    }

    if (req.url.startsWith('/auth')) {
      return proxyAuth(req, res, next);
    }

    if (req.url.startsWith('/products')) {
      return proxyProducts(req, res, next);
    }
    next();
  }
}
