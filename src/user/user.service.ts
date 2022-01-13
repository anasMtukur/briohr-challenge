import { HttpException, Injectable } from '@nestjs/common';
import { USERS } from 'src/mocks/user.mock';

@Injectable()
export class UserService {
  users = USERS;

  getUsers(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getUser(userID): Promise<any> {
    const id = Number(userID);
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        throw new HttpException('User does not exist!', 404);
      }
      resolve(user);
    });
  }
}
