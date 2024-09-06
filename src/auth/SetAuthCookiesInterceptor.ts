import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetAuthCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((responseBody: any) => {
        const { accessToken, refreshToken, xsrfToken, ...rest } = responseBody;

        const response = context.switchToHttp().getResponse();
        response.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
        });
        response.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
        });
        response.cookie('XSRF-TOKEN', xsrfToken, {
          httpOnly: false,
          secure: true,
          sameSite: 'Strict',
        });
        return rest;
      }),
    );
  }
}
