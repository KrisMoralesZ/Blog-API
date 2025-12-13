import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '@posts/posts.controller';
import { PostsService } from '@posts/posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  const mockService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        { provide: 'PostRepository', useValue: mockService },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array with all of the posts', async () => {
    const posts = [];
    mockService.find.mockResolvedValue(posts);

    expect(await controller.findAll()).toEqual(posts);
  });

  it('should return a single post', async () => {
    const post = { id: 1, title: 'Test Post' };
    mockService.findOne.mockResolvedValue(post);

    expect(await controller.findOne('1')).toEqual(post);
  });

  it('should create a post', async () => {
    const post = { title: 'New Post', content: 'Content', userId: 1 };
    mockService.create.mockReturnValue(post);
    mockService.save.mockResolvedValue(post);

    expect(await controller.create(post)).toEqual(post);
  });

  it('should update a post', async () => {
    const updates = { title: 'Updated Post' };
    mockService.update.mockResolvedValue({ affected: 1 });

    expect(await controller.update('1', updates)).toEqual({ affected: 1 });
  });

  it('should delete a post', async () => {
    mockService.delete.mockResolvedValue({ affected: 1 });

    expect(await controller.remove('1')).toEqual({ affected: 1 });
  });
});
