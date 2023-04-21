import { IsNumber, IsOptional, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  qty: number;

  @IsUrl()
  @IsOptional()
  image?: string;
}
