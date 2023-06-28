import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsersHandler } from './create-user.handler';
import { UsersEntity } from '../../entities/users.entity';
import { CreateUsersCommand } from './create-user.command';

describe('CreateUsersHandler', () => {
  let createUsersHandler: CreateUsersHandler;
  let userRepository: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsersHandler,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    createUsersHandler = module.get<CreateUsersHandler>(CreateUsersHandler);
    userRepository = module.get<Repository<UsersEntity>>(getRepositoryToken(UsersEntity));
  });

  it('should create a new user successfully', async () => {
    const command = new CreateUsersCommand({
      email: 'test@mail.com',
      username: 'test',
      password: 'password',
      displayPicture: 'url',
      bio: 'Bio',
    });

    await createUsersHandler.execute(command);
    expect(userRepository.create).toBeCalled();
    expect(userRepository.save).toBeCalled();
  });

  it('should throw an exception if email is duplicated', async () => {
    const command = new CreateUsersCommand({
      email: 'test@mail.com',
      username: 'test',
      password: 'password',
      displayPicture: 'url',
      bio: 'Bio',
    });

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(new UsersEntity());

    try {
      await createUsersHandler.execute(command);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Client with this email exists');
      expect(error.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
    }
  });
});
