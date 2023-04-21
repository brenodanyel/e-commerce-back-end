import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserPresenter } from './user.presenter';
import { PasswordHash } from 'src/helpers/passwordHash';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUsers() {
    const users = await this.userModel.find();
    return users.map((user) => new UserPresenter(user));
  }

  async createUser(payload: CreateUserDto) {
    const existentUser = await this.userModel.findOne({
      $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (existentUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userModel.create({
      ...payload,
      password: await PasswordHash.hash(payload.password),
    });

    return new UserPresenter(user);
  }

  async findUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new UserPresenter(user);
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    const existentUser = await this.userModel.findOne({
      $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (existentUser && existentUser._id.toString() !== id) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...payload,
        password: payload.password
          ? await PasswordHash.hash(payload.password)
          : undefined,
      },
      { new: true },
    );

    return new UserPresenter(user);
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new UserPresenter(user);
  }
}
