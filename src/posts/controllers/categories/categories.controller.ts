import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from '@posts/dto/create-category.dto';
import { UpdateCategoryDto } from '@posts/dto/update-category.dto';
import { CategoriesService } from '@posts/services/categories/categories.service';
import { PostsService } from '@posts/services/posts.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postService: PostsService,
  ) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto.name);
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get(':id/posts')
  getPostsByCategoryId(@Param('id') id: number) {
    return this.postService.getPostsByCategoryId(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(
      id,
      updateCategoryDto.name || '',
    );
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
