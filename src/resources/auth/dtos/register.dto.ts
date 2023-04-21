import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
