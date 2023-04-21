import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './mongo.module';

import { UserSeed } from './seeds/user.seed';
import { User, UserSchema } from './schemas/user.schema';

import { ProductSeed } from './seeds/product.seed';
import { Product, ProductSchema } from './schemas/product.schema';

seeder({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
}).run([UserSeed, ProductSeed]);
