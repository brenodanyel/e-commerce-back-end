import { IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
