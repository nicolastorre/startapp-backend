import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { ResourceMiddleware } from 'src/authorization/middlewares/resource.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), AuthorizationModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResourceMiddleware).forRoutes({
      path: 'articles/resource/:uuid',
      method: RequestMethod.ALL,
    });
  }
}
