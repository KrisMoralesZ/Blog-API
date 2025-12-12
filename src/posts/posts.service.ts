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

  async create(body: CreatePostDto) {
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

  async findAll() {
    const posts = await this.postsRepository.find({
      relations: ['user'],
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, updates: UpdatePostDto) {
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

  async remove(id: number) {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      await this.postsRepository.remove(post);
      return { message: `Post with ID ${id} has been removed` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error removing post: ' + error.message);
      }
      throw new Error('Error removing post: Unknown error');
    }
  }
}
