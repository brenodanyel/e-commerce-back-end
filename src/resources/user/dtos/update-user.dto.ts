import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(4, 50)
  @IsOptional()
  username?: string;

  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
