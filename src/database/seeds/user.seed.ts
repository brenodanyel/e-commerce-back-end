import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PasswordHash } from '../../helpers/passwordHash';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserSeed {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed() {
    const users: User[] = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await PasswordHash.hash(''),
      },
    ];

    for (const user of users) {
      const userExists = await this.userModel.findOne({ username: user.username });

      if (!userExists) {
        await this.userModel.create(user);
      }
    }
  }
}
