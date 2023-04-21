import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [MongoModule, AuthModule, UserModule],
})
export class AppModule {}
