import { IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateArticleDto {
  @IsString()
  title: string;

  user: User;
}
