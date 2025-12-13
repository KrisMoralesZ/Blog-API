import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from '@posts/posts.service';
import { CreatePostDto } from '@posts/dto/create-post.dto';
import { UpdatePostDto } from '@posts/dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
