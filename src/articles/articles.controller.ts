import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindOneParamDto } from 'src/common/dto/find-one-param.dto';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { RolesGuard } from 'src/authorization/role.guards';
import { Role } from 'src/authorization/Role.enum';
import { XsrfGuard } from 'src/auth/xsrf.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param() findOneParamDto: FindOneParamDto) {
    return this.articlesService.findByUuid(findOneParamDto.uuid);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(XsrfGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req: any) {
    createArticleDto.user = req.user.uuid;
    return this.articlesService.create(createArticleDto);
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
