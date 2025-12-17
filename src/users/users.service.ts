import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@users/dto/users.dto';

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

  async getUserProfile(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    return user?.profile;
  }

  async getUserPosts(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    return user?.posts;
  }

  async createUser(body: CreateUserDto) {
    const newUser = this.usersRepository.create({
      email: body.email,
      password: body.password,
      profile: {
        name: body.profile.name,
        lastName: body.profile.lastName,
        avatar: body.profile.avatar,
      },
    });

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
