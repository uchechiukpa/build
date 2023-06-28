import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUsersCommand } from './commands/create-users/create-user.command';
import { CreateUsersDTO } from './dto/create-users/create-users-request.dto';
import { GetUserReponseDto } from './dto/get-user/get-users-response.dto';
import { GetUserQuery } from './queries/get-user/get-user.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}


  @Post()
  async createUser(@Body() createUsersDTO: CreateUsersDTO){
    return await this.commandBus.execute(new CreateUsersCommand(createUsersDTO))
  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found.', type: GetUserReponseDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<GetUserReponseDto> {
      return await this.queryBus.execute(new GetUserQuery(id));
  }
}
