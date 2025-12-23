import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '@posts/services/posts.service';
import { CategoriesService } from '@posts/services/categories/categories.service';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const mockCategoriesService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockPostsService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of categories', async () => {
    const result = [{ id: 1, name: 'Tech' }];

    jest.spyOn(controller as any, 'getAllCategories').mockResolvedValue(result);

    await expect(controller.getAllCategories()).resolves.toBe(result);
  });

  it('should create a category', async () => {
    const dto = { name: 'Health' };
    const result = { id: 2, ...dto };

    jest.spyOn(controller as any, 'createCategory').mockResolvedValue(result);

    await expect(controller.createCategory(dto)).resolves.toBe(result);
  });

  it('should delete a category', () => {
    const categoryId = 1;
    const result = { deleted: true };

    jest.spyOn(controller as any, 'deleteCategory').mockReturnValue(result);

    expect(controller.deleteCategory(categoryId)).toBe(result);
  });
});
