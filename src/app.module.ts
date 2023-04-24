import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { ProductModule } from './resources/product/product.module';
import { UploadModule } from './resources/upload/upload.module';

@Module({
  imports: [MongoModule, AuthModule, UserModule, ProductModule, UploadModule],
})
export class AppModule {}
