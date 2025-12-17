import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UsersController } from '@users/users.controller';
import { User } from '@users/entities/user.entity';
import { Profile } from '@users/entities/profile.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
