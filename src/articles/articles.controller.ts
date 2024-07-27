import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindOneParamDto } from 'src/common/dto/find-one-param.dto';
import { PoliciesGuard } from 'src/authorization/policies.guard';
import { PermissionAction } from 'src/authorization/decorators/permission.decorator';
import { Action } from 'src/authorization/entities/permission.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @UseGuards(PoliciesGuard)
  @PermissionAction(Action.READ)
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @UseGuards(PoliciesGuard)
  @PermissionAction(Action.READ)
  @Get('/resource/:uuid')
  findOne(@Param() findOneParamDto: FindOneParamDto) {
    return this.articlesService.findOneByResourceUuid(findOneParamDto.uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update('uuid', updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
