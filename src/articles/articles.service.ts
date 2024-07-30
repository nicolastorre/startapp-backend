import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Brackets, Repository } from 'typeorm';
import { Action, Role } from 'src/authorization/entities/permission.entity';
import { ResourceService } from 'src/authorization/resource.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private resourceService: ResourceService,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    createArticleDto.resource =
      this.resourceService.createResourceWithPermissions(
        'Article',
        Object.values(Action),
        Role.ADMIN,
      );
    return this.articleRepository.save(createArticleDto);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findAllWithPermissions(
    role: Role,
    userUuid: string,
    action: Action,
  ): Promise<Article[]> {
    return this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.user', 'user')
      .innerJoinAndSelect('article.resource', 'resource')
      .innerJoin('resource.permissions', 'permissions')
      .where('permissions.action = :action', { action })
      .andWhere(
        new Brackets((qb) => {
          qb.where('permissions.user = :userUuid', {
            userUuid,
          }).orWhere('permissions.role = :role', {
            role,
          });
        }),
      )
      .getMany();
  }

  findOneByResourceUuid(uuid: string): Promise<Article | null> {
    return this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.resource', 'resource')
      .where('resource.uuid = :uuid', { uuid })
      .getOne();
  }

  update(uuid: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update({ uuid }, updateArticleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
