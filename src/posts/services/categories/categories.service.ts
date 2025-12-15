import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@posts/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(name: string) {
    const newCategory = this.categoriesRepository.create({ name });
    return await this.categoriesRepository.save(newCategory);
  }

  async getAllCategories() {
    return await this.categoriesRepository.find();
  }

  async getCategoryById(id: number) {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async updateCategory(id: number, name: string) {
    await this.categoriesRepository.update(id, { name });
    return this.getCategoryById(id);
  }

  async deleteCategory(id: number) {
    const result = await this.categoriesRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
