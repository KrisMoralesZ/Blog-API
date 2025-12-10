import { Controller } from '@nestjs/common';
import { CategoriesService } from 'src/posts/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}
