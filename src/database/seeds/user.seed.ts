import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PasswordHash } from '../../helpers/passwordHash';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UserSeed {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const users: User[] = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await PasswordHash.hash(''),
      },
    ];

    for (const user of users) {
      const userExists = await this.userModel.findOne({
        $or: [{ username: user.username }, { email: user.email }],
      });

      if (!userExists) {
        await this.userModel.create(user);
      }
    }

    console.log('Users seed completed successfully');
  }
}
