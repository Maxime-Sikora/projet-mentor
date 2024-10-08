import { IsEmail, IsString } from 'class-validator';

export class AuthSingInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
