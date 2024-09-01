import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from './connection.service';
import { Connection } from './entities/connection.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/authorization/Role.enum';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export type TokenPayload = {
  sessionUuid: string;
  userUuid: string;
  role: Role;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  xsrfToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private connectionService: ConnectionService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pwd: string): Promise<Tokens> {
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

    const sessionUuid = uuidv4();
    const payload: TokenPayload = {
      sessionUuid,
      userUuid: user.uuid,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);
    const xsrfToken = this.generateXsrfToken(sessionUuid);

    const connection = new Connection();
    connection.refreshToken = refreshToken;
    connection.user = user;
    this.connectionService.create(connection);

    return {
      accessToken,
      refreshToken,
      xsrfToken,
    };
  }

  async signOut(refreshToken: string) {
    return this.connectionService.removeBy('refreshToken', refreshToken);
  }

  async refreshConnection(oldRefreshToken: string): Promise<Tokens> {
    let payload: TokenPayload;
    try {
      payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: this.configService.get('jwt.secret'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneBy('uuid', payload.userUuid);
    if (!user) {
      throw new UnauthorizedException();
    }

    const sessionUuid = uuidv4();
    payload.sessionUuid = sessionUuid;

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);
    const xsrfToken = this.generateXsrfToken(sessionUuid);

    const connection = await this.connectionService.findOneBy(
      'refreshToken',
      refreshToken,
    );
    if (!connection) {
      throw new UnauthorizedException();
    }

    connection.refreshToken = refreshToken;
    connection.user = user;
    this.connectionService.update(connection.uuid, connection);

    return {
      accessToken,
      refreshToken,
      xsrfToken,
    };
  }

  generateXsrfToken(sessionId: string): string {
    const xsrfSecret = this.configService.get('xsrf.secret');
    return createHmac('sha256', xsrfSecret).update(sessionId).digest('hex');
  }
}
