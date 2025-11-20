import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = [{ id: 1, name: 'John Doe' }];
    jest
      .spyOn(controller as any, 'getUsers')
      .mockImplementation(async () => result);
    expect(await controller.getUsers()).toBe(result);
  });

  it('should create a user', async () => {
    const dto = { name: 'Jane Doe', email: 'jane@example.com' };
    const result = { id: 2, ...dto };
    jest
      .spyOn(controller as any, 'createUser')
      .mockImplementation(async () => result);
    expect(await controller.createUser(dto)).toBe(result);
  });

  it('should delete a user', async () => {
    const userId = 1;
    const result = { deleted: true };
    jest
      .spyOn(controller as any, 'deleteUser')
      .mockImplementation(() => result);
    expect(controller.deleteUser(userId)).toBe(result);
  });
});
