import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersCommands } from './commands';
import { UsersEntity } from './entities/users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService, ...usersCommands],
})
export class UsersModule {}
