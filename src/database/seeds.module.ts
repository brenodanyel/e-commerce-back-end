import { Module } from '@nestjs/common';
import { UserSeed } from './seeds/user.seed';
import { ProductSeed } from './seeds/product.seed';

@Module({
  imports: [UserSeed, ProductSeed],
})
export class SeedsModule {}
