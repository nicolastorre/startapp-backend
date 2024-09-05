import { Module } from '@nestjs/common';
import { XsrfService } from './xsrf.service';
import { XsrfGuard } from './xsrf.guard';

@Module({
  providers: [XsrfService, XsrfGuard],
  exports: [XsrfService, XsrfGuard],
})
export class XsrfModule {}
