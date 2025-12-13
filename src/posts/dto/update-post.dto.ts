import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from '@posts/dto/create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
