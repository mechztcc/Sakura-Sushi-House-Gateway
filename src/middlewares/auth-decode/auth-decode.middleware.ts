import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Options, createProxyMiddleware } from 'http-proxy-middleware';
import { catchError } from 'rxjs';

@Injectable()
export class AuthDecodeMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization'];
    if (!token) {
      next();
    }

    if (token) {
      this.httpService
        .post('http://localhost:3001/auth/decode', {
          token,
        })
        .pipe(
          catchError((error: AxiosError) => {
            return res.json({ message: error.message });
          }),
        )
        .subscribe(({ data }: any) => {
          const { id } = data;
          req.headers.user_id = id;
          next();
        });
    }
  }
}
