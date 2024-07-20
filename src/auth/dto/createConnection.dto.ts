import { User } from 'src/user/entities/user.entity';

export class CreateConnectionDto {
  refreshToken: string;

  user: User;
}
