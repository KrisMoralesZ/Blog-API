import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '@posts/posts.service';
import { PostsController } from '@posts/posts.controller';
import { Post } from '@posts/entities/post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
