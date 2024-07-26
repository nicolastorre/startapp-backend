import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/authorization/entities/permission.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  role: Role;
}
