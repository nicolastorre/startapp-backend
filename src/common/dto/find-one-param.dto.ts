import { IsUUID } from 'class-validator';

export class FindOneParamDto {
  @IsUUID()
  uuid: string;
}
