import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(body: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: body.name,
      email: body.email,
    };
    this.users.push(newUser);
    return newUser;
  }
}
