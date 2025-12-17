import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = [{ id: 1, name: 'Test' }];
    mockRepository.find.mockResolvedValue(users);

    expect(await service.getAllUsers()).toEqual(users);
  });

  it('should create a user', async () => {
    const data = {
      email: 'newuser@example.com',
      password: 'password123',
      profile: { name: 'New User', lastName: 'User', avatar: 'avatar.jpg' },
    };

    mockRepository.save.mockResolvedValue({ id: 1, ...data });

    expect(await service.createUser(data)).toEqual({ id: 1, ...data });
  });
});
