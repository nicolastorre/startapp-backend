import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/IsPublic';
import { Request } from 'express';
import { Response } from 'express';
import { SetAuthCookiesInterceptor } from './SetAuthCookiesInterceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @UseInterceptors(SetAuthCookiesInterceptor)
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signOut(request.cookies['refreshToken']);
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
    });
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    response.clearCookie('XSRF-TOKEN', {
      httpOnly: true,
      secure: true,
    });
    return { message: 'ok' };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refreshConnection')
  @UseInterceptors(SetAuthCookiesInterceptor)
  async refreshConnection(@Req() request: Request) {
    if (!request.cookies['refreshToken']) {
      throw new BadRequestException();
    }

    return this.authService.refreshConnection(request.cookies['refreshToken']);
  }
}
