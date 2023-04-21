import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedsModule } from './seeds.module';

const {
  MONGO_DB_CONNECTION_STRING = 'mongodb://localhost:27017/',
  MONGO_DB_NAME = 'db',
  MONGO_DB_USERNAME = 'root',
  MONGO_DB_PASSWORD = 'root',
} = process.env;

@Module({
  imports: [
    SeedsModule,
    MongooseModule.forRoot(MONGO_DB_CONNECTION_STRING, {
      dbName: MONGO_DB_NAME,
      auth: {
        username: MONGO_DB_USERNAME,
        password: MONGO_DB_PASSWORD,
      },
    }),
  ],
})
export class MongoModule {}
