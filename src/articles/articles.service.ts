import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findByUuid(userUuid: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { user: { uuid: userUuid } },
      relations: ['user'],
    });
  }

  update(uuid: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update({ uuid }, updateArticleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
