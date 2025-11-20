import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', () => {
    expect(service.getAllUsers()).toEqual([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ]);
  });

  it('should create a user', () => {
    const dto = { name: 'Test User', email: 'test@example.com' };
    const result = { id: 4, ...dto };
    expect(service.createUser(dto)).toEqual(result);
  });
});
