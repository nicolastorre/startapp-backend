import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/IsPublic';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  signOut(@Body() tokenDto: TokenDto) {
    return this.authService.signOut(tokenDto.refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('token')
  token(@Body() tokenDto: TokenDto) {
    return this.authService.token(tokenDto.refreshToken);
  }
}
