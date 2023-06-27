import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUsersCommand } from './commands/create-users/create-user.command';
import { CreateUsersDTO } from './dto/create-users-request.dto';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commandBus: CommandBus
    ) {}


  @Post('create-user')
  async createUser(@Body() createUsersDTO: CreateUsersDTO){
    return await this.commandBus.execute(new CreateUsersCommand(createUsersDTO))
  }


}
