import { Module } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  controllers: [PostsController, CategoriesController],
  providers: [PostsService],
})
export class PostsModule {}
