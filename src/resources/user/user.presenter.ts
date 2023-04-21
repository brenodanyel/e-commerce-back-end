import { UserDocument } from '../../database/schemas/user.schema';

export class UserPresenter {
  public id: string;
  public username: string;
  public email: string;
  public password?: string;

  constructor(input: UserDocument) {
    this.id = input._id.toString();
    this.username = input.username;
    this.email = input.email;
    // this.password = input.password;
  }
}
