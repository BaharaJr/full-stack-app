import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: `Welcome TODO APP, headover to URL to test functionalities`,
      URL: `https://bunny-todo-backend.herokuapp.com/documentation`
    }
}
}