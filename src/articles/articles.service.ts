import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { Action, Role } from 'src/authorization/entities/permission.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    createArticleDto.resource.name = createArticleDto.title;
    createArticleDto.resource.type = 'Article';
    createArticleDto.resource.permissions = [
      { action: Action.READ, role: Role.ADMIN },
    ];
    return this.articleRepository.save(createArticleDto);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(uuid: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update({ uuid }, updateArticleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
