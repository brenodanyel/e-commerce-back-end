import * as bcryptjs from 'bcryptjs';

export class PasswordHash {
  static hash(password: string) {
    return bcryptjs.hash(password, 10);
  }

  static compare(password: string, hash: string) {
    return bcryptjs.compare(password, hash);
  }
}
