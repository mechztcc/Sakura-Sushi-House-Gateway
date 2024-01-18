import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  Options,
  createProxyMiddleware,
  fixRequestBody,
} from 'http-proxy-middleware';
import { json } from 'body-parser';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const jsonParseMiddleware = json();

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
      secure: false,
      pathRewrite: {
        '^/auth': '/auth',
      },
      onProxyReq: fixRequestBody
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
      onProxyReq: fixRequestBody
    };
    const proxyOptionsCategories: Options = {
      target: 'http://localhost:3002/',
      changeOrigin: true,
      headers: {
        'Content-Type': 'application/json',
      },
      secure: false,
      pathRewrite: {
        '^/categories': '/categories',
      },
    };

    const proxyUsers = createProxyMiddleware(proxyOptionsUsers);
    const proxyAuth = createProxyMiddleware(proxyOptionsAuth);
    const proxyProducts = createProxyMiddleware(proxyOptionsProducts);
    const proxyCategories = createProxyMiddleware(proxyOptionsCategories);

    if (req.url.startsWith('/users')) {
      return proxyUsers(req, res, next);
    }

    if (req.url.startsWith('/auth')) {
      return proxyAuth(req, res, next);
    }

    if (req.url.startsWith('/products')) {
      return proxyProducts(req, res, next);
    }
    if (req.url.startsWith('/categories')) {
      return proxyCategories(req, res, next);
    }
    next();
  }
}
