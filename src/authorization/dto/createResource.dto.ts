import { IsArray, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsArray()
  @IsString({ each: true })
  Uuidpermissions?: string[];
}
