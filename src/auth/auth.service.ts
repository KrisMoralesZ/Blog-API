import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
