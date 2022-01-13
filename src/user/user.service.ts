import { HttpException, Injectable } from '@nestjs/common';
import { USERS } from 'src/mocks/user.mock';

@Injectable()
export class UserService {
  users = USERS;

  getBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.users.find((book) => book.id === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }
}
