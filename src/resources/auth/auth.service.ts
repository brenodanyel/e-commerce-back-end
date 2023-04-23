import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { PasswordHash } from 'src/helpers/passwordHash';
import { LoginDto } from './dtos/login.dto';
import { User } from '../../database/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import { UserPresenter } from '../user/user.presenter';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({
      username: payload.username,
    });

    if (!user) {
      throw new HttpException('User or password incorrect!', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await PasswordHash.compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('User or password incorrect!', HttpStatus.UNAUTHORIZED);
    }

    return {
      token: await this.jwtService.signAsync({ id: user._id.toString() }),
      user: new UserPresenter(user),
    };
  }

  async register(payload: RegisterDto) {
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

    return {
      token: await this.jwtService.signAsync({ id: user._id.toString() }),
      user: new UserPresenter(user),
    };
  }
}
