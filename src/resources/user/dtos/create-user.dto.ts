import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
