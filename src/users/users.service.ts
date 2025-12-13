import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async createUser(body: CreateUserDto) {
    const newUser = this.usersRepository.create(body);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(id: number, body: Partial<UpdateUserDto>) {
    await this.usersRepository.update(id, body);
    return this.getUserById(id);
  }

  async deleteUser(id: number) {
    const result = await this.usersRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
