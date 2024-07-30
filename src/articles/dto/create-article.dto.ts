import { IsString } from 'class-validator';
import { CreateResourceDto } from 'src/authorization/dto/createResource.dto';
import { User } from 'src/user/entities/user.entity';

export class CreateArticleDto {
  @IsString()
  title: string;

  user: User;

  resource: CreateResourceDto;
}
