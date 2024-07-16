import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pwd: string): Promise<any> {
    const user = await this.userService.findOneBy('email', email);
    if (user?.hashedPassword !== pwd) {
      throw new UnauthorizedException();
    }

    delete user.hashedPassword;

    const payload = { sub: user.uuid, username: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
