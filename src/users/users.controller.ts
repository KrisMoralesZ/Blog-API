import { UsersService } from './users.service';
import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/models/user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findUser(@Param('id') id: number): User | undefined {
    return this.usersService.getUserById(id);
  }
}
