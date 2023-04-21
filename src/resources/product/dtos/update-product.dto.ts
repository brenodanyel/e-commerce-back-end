import { IsNumber, IsOptional, IsString, IsUrl, Length, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @Length(3, 20)
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  qty?: number;

  @IsUrl()
  @IsOptional()
  image?: string;
}
