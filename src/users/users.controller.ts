import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { CreateUserDto, UpdateUserDto } from '@users/dto/users.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/profile')
  getUserProfile(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/posts')
  getUserPosts(@Param('id') id: number) {
    return this.usersService.getUserPosts(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  UpdateUserDto(@Param('id') id: number, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
