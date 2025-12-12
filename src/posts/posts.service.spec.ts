import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  const mockService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: 'PostRepository', useValue: mockService },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array with all of the posts', async () => {
    const posts = [];
    mockService.find.mockResolvedValue(posts);

    expect(await service.getAllPosts()).toEqual(posts);
  });

  it('should return a single post', async () => {
    const post = { id: 1, title: 'Test Post' };
    mockService.findOne.mockResolvedValue(post);

    expect(await service.getPostById(1)).toEqual(post);
  });

  it('should create a post', async () => {
    const post = { title: 'New Post', content: 'Content', userId: 1 };
    mockService.create.mockReturnValue(post);
    mockService.save.mockResolvedValue(post);

    expect(await service.createPost(post)).toEqual(post);
  });

  it('should update a post', async () => {
    const updates = { title: 'Updated Post' };
    mockService.update.mockResolvedValue({ affected: 1 });

    expect(await service.updatePost(1, updates)).toEqual({ affected: 1 });
  });
});
