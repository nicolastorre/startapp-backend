import { IsString } from 'class-validator';
import { CreateResourceDto } from 'src/authorization/dto/createResource.dto';

export class CreateArticleDto {
  @IsString()
  title: string;

  resource: CreateResourceDto;
}
