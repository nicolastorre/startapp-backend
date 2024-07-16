import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParamDto } from 'src/common/dto/find-one-param.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    const user = await this.userService.findOne(findOneParamDto.uuid);

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
