import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from './connection.service';
import { Connection } from './entities/connection.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private connectionService: ConnectionService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pwd: string): Promise<any> {
    const user = await this.userService.findOneBy('email', email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatchPwd = user?.hashedPassword
      ? await bcrypt.compare(pwd, user?.hashedPassword)
      : false;

    if (!isMatchPwd) {
      throw new UnauthorizedException();
    }

    delete user.hashedPassword;

    const payload = { sub: user.uuid, username: user.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);

    const connection = new Connection();
    connection.refreshToken = refreshToken;
    connection.user = user;
    this.connectionService.create(connection);

    return {
      accessToken,
      refreshToken,
    };
  }
}
