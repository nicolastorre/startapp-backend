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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParamDto } from 'src/common/dto/find-one-param.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param() findOneParamDto: FindOneParamDto) {
    const user = await this.userService.findOneBy('uuid', findOneParamDto.uuid);

    if (user) {
      delete user.hashedPassword;
    }

    return user;
  }

  @Patch(':uuid')
  update(
    @Param() findOneParamDto: FindOneParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(findOneParamDto.uuid, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param() findOneParamDto: FindOneParamDto) {
    return this.userService.remove(findOneParamDto.uuid);
  }
}
