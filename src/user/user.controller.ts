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
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators/IsPublic';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get('/user/profile')
  getProfile(@Request() req: any) {
    return this.userService.findOneBy('uuid', req.user.uuid);
  }

  @Get('/user/:uuid')
  async findOne(@Param() findOneParamDto: FindOneParamDto) {
    const user = await this.userService.findOneBy('uuid', findOneParamDto.uuid);

    if (user) {
      delete user.hashedPassword;
    }

    return user;
  }

  @Patch('/user/:uuid')
  update(
    @Param() findOneParamDto: FindOneParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(findOneParamDto.uuid, updateUserDto);
  }

  @Delete('/user/:uuid')
  remove(@Param() findOneParamDto: FindOneParamDto) {
    return this.userService.remove(findOneParamDto.uuid);
  }
}
