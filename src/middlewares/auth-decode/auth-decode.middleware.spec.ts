import { AuthDecodeMiddleware } from './auth-decode.middleware';

describe('AuthDecodeMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthDecodeMiddleware()).toBeDefined();
  });
});
