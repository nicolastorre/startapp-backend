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
import { PoliciesGuard } from 'src/authorization/policies.guard';
import { PermissionAction } from 'src/authorization/decorators/permission.decorator';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { RolesGuard } from 'src/authorization/role.guards';
import { Action } from 'src/authorization/Action.enum';
import { Role } from 'src/authorization/Role.enum';
import { XsrfGuard } from 'src/auth/Xsrf.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(XsrfGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req: any) {
    createArticleDto.user = req.user.uuid;
    return this.articlesService.create(createArticleDto);
  }

  @PermissionAction(Action.READ)
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.articlesService.findAllWithPermissions(
      req.user.role,
      req.user.uuid,
      Action.READ,
    );
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
