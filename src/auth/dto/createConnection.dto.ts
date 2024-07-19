import { User } from 'src/user/entities/user.entity';

export class CreateConnectionDto {
  refreshToken: string;

  datetime: Date;

  user: User;
}
