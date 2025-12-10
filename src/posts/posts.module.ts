import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService],
})
export class PostsModule {}
