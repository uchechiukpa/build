import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/users.entity';
import { CreateUsersCommand } from './create-user.command';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { CreatedUserReponseObject } from '../../dto/create-users-response.dto';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateUsersCommand)
export class CreateUsersHandler implements ICommandHandler<CreateUsersCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
    ) {}

  async execute(
    command: CreateUsersCommand,
  ): Promise<CreatedUserReponseObject> {
    const {
      createUsersDto: { email, username, password, displayPicture, bio },
    } = command;
    await this.checkDuplicateEmail(email);

    const { salt, hash } = this.hashPassword(password);
    const user = this.usersRepository.create({
      email,
      username,
      displayPicture,
      bio,
      password: hash,
      salt,
    });
    await this.usersRepository.save(user);
    return;
  }
  async checkDuplicateEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'Client with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');

    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return { salt, hash };
  }
}
