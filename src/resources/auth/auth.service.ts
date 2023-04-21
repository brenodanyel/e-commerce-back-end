import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({
      username: payload.username,
    });

    if (!user) {
      throw new HttpException('User or password incorrect!', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Login successful',
    };
  }
  register(payload: LoginDto) {}
}
