import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { AuthModule } from 'src/auth/auth.module';
import { XsrfModule } from 'src/xsrf/xsrf.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    AuthModule,
    AuthorizationModule,
    XsrfModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
