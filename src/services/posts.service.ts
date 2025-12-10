import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { UpdatePostDto } from '../posts/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';
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
    } catch (error) {
      throw new Error('Error creating post: ' + error.message);
    }
  }

  async findAll() {
    const posts = await this.postsRepository.find({
      relations: ['user.profile'],
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile'],
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
    } catch (error) {
      throw new Error('Error updating post: ' + error.message);
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
    } catch (error) {
      throw new Error('Error removing post: ' + error.message);
    }
  }
}
