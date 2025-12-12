import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(body: CreatePostDto) {
    try {
      const newPost = this.postsRepository.create(body);
      await this.postsRepository.save(newPost);
      return newPost;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error creating post: ' + error.message);
      }
      throw new Error('Error creating post: Unknown error');
    }
  }

  async getAllPosts() {
    const posts = await this.postsRepository.find();
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async updatePost(id: number, updates: UpdatePostDto) {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return this.postsRepository.update(id, updates);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error updating post: ' + error.message);
      }
      throw new Error('Error updating post: Unknown error');
    }
  }

  async deletePost(id: number) {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return result;
  }
}
