import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class XsrfService {
  constructor(private configService: ConfigService) {}

  generateXsrfToken(sessionId: string): string {
    const xsrfSecret = this.configService.get('xsrf.secret');
    return createHmac('sha256', xsrfSecret).update(sessionId).digest('hex');
  }
}
