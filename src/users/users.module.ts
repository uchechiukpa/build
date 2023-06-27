import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersCommands } from './commands';
import { UserEntity } from './entities/users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ...usersCommands],
})
export class UsersModule {}
