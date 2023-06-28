import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { GetUserHandler } from './get-user.handler';
import { UsersEntity } from '../../entities/users.entity';
import { GetUserQuery } from './get-user.query';
import { GetUserReponseDto} from '../../dto/get-user/get-users-response.dto';


describe('GetUserHandler', () => {
  let getUserHandler: GetUserHandler;
  let userRepository: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserHandler,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    getUserHandler = module.get<GetUserHandler>(GetUserHandler);
    userRepository = module.get<Repository<UsersEntity>>(getRepositoryToken(UsersEntity));
  });

  it('should return a user when user is found', async () => {
    const user = new UsersEntity();
    user.id = 1;
    user.username = 'test';
    user.email = 'test@test.com';
    user.displayPicture = 'picture.jpg';
    user.bio = 'A test user';
    user.lastLogin = new Date();

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const query = new GetUserQuery(1);
    const result = await getUserHandler.execute(query);
    expect(result).toEqual(new GetUserReponseDto({
      status: 'success',
      message: 'user retrieved successfully',
      responseCode: 200,
      data: {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        displayPicture: 'picture.jpg',
        bio: 'A test user',
        lastLogin: user.lastLogin,
      },
    }));
  });

  it('should throw an exception when user is not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const query = new GetUserQuery(1);
    await expect(getUserHandler.execute(query)).rejects.toThrow(HttpException);
  });
});
