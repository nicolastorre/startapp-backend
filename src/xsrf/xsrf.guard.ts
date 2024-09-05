import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenPayload } from '../auth/auth.service';
import { XsrfService } from 'src/xsrf/xsrf.service';

@Injectable()
export class XsrfGuard implements CanActivate {
  constructor(private readonly xsrfService: XsrfService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload: TokenPayload = request['user'] || undefined;
    const xsrfTokenFromHeader = request.headers['xsrf-token'];

    if (!payload?.sessionUuid) {
      throw new BadRequestException('Session UUID not found');
    }

    const expectedToken = this.xsrfService.generateXsrfToken(
      payload?.sessionUuid,
    );
    if (xsrfTokenFromHeader !== expectedToken) {
      throw new BadRequestException('Invalid CSRF token');
    }

    return true;
  }
}
