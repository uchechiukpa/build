import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserReponseDto } from '../../dto/get-user/get-users-response.dto';
import { UsersEntity } from '../../entities/users.entity';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async execute(query: GetUserQuery): Promise<GetUserReponseDto> {
    const { id: userId } = query;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const { id, username, email, displayPicture, bio, lastLogin } = user;
    return new GetUserReponseDto({
      status: 'success',
      message: 'user retrieved successfully',
      responseCode: 200,
      data: {
        id,
        username,
        email,
        displayPicture,
        bio,
        lastLogin,
      },
    });
  }
}
