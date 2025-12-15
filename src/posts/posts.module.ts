import { CategoriesService } from '@posts/services/categories/categories.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from '@posts/services/posts.service';
import { PostsController } from '@posts/controllers/posts.controller';
import { Post } from '@posts/entities/post.entity';
import { CategoriesController } from './controllers/categories/categories.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService],
})
export class PostsModule {}
