import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParamDto } from 'src/common/dto/find-one-param.dto';
import { Role } from 'src/authorization/Role.enum';
import { XsrfGuard } from 'src/auth/xsrf.guard';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { RolesGuard } from 'src/authorization/role.guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/profile')
  getProfile(@Request() req: any) {
    return this.userService.findOneBy('uuid', req.user.uuid);
  }

  @Roles(Role.ADMIN)
  @UseGuards(XsrfGuard, RolesGuard)
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/user/:uuid')
  async findOne(@Param() findOneParamDto: FindOneParamDto) {
    const user = await this.userService.findOneBy('uuid', findOneParamDto.uuid);

    if (user) {
      delete user.hashedPassword;
    }

    return user;
  }

  @Roles(Role.ADMIN)
  @UseGuards(XsrfGuard, RolesGuard)
  @Patch('/user/:uuid')
  update(
    @Param() findOneParamDto: FindOneParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(findOneParamDto.uuid, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(XsrfGuard, RolesGuard)
  @Delete('/user/:uuid')
  remove(@Param() findOneParamDto: FindOneParamDto) {
    return this.userService.remove(findOneParamDto.uuid);
  }
}
