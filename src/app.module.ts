import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ArticlesModule } from './articles/articles.module';
import { Resource } from './authorization/entities/resource.entity';
import { Permission } from './authorization/entities/permission.entity';
import { Article } from './articles/entities/article.entity';
import { Connection } from './auth/entities/connection.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        autoLoadEntities: true,
        entities: [User, Connection, Resource, Permission, Article],
        migrations: ['./migrations'],
        migrationsTableName: 'custom_migration_table',
      }),
    }),
    UserModule,
    CommonModule,
    AuthModule,
    AuthorizationModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
